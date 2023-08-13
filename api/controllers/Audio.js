const fs = require("fs");
const path = require("path");
const { validator, exclude } = require("../utils.js");
const models = require("../models");

require("dotenv").config();
const { GetPagination, GetPagingDatas } = require("../utils.js");
const { StoragePath } = require("../middleware/MulterFileManager.js");

module.exports = {
  get: async function (req, res) {
    let validated = validator(req.params, { id: "int|required" });

    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    const audio = await models.Audio.findOne({
      where: { id: validated.validated.id },
      attributes: ["id", "userID", "name", "imported_date", "src", "public"],
      // include: [{ model: models.User, as: "User" }],
    });

    if (!audio)
      return res.status(403).json({ errors: "L'audio n'a pas été trouvé !" });

    if (req.user == undefined) {
      if (!audio.public) {
        return res.status(401).json({
          message: "Vous n'êtes pas autorisé à accéder à cet ressource.",
        });
      }
    }

    if (!audio.public && audio.userID != req.user.id)
      return res.status(401).json({
        message: "Vous n'êtes pas autorisé à accéder à cet ressource.",
      });

    const audioPath =
      StoragePath(audio.userID) + audio.imported_date + "-" + audio.name;

    if (!fs.existsSync(audioPath))
      return res
        .status(403)
        .json({ error: "Une erreur s'est produite avec le fichier" });

    return res.sendFile(audioPath);
  },

  /**
   * Library will return all imported song of one user
   * @param {Request} req
   * @param {Response} res
   */
  library: async function (req, res) {
    let audios = await models.Audio.findAll({
      where: { userID: req.user.id },
      attributes: ["id", "userID", "name", "src", "public"],
    }).catch((error) => console.log(error));

    if (audios === undefined) return res.status(200).json({ audios: [] });

    return res.status(200).json(audios);
  },

  /**
   * Store will return all public song
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  store: async function (req, res) {
    let { page, size } = req.query;

    if (!size) size = 5;
    const { limit, offset } = GetPagination(page, size);

    let audios = await models.Audio.findAndCountAll({
      where: { public: true },
      attributes: ["id", "userID", "name", "src"],
      limit: limit,
      offset: offset,
    }).catch((error) => console.log(error));

    if (audios === undefined) return res.status(200).json({ audios: [] });
    const response = GetPagingDatas(audios, page, limit);
    return res.status(200).json(response);
  },

  /**
   * @summary Build default audio config to insert in database
   *          Return default audio config
   * @param {any} req
   * @param {any} res
   * @returns
   */
  Import: async function (req, res) {
    console.log(req.AutorizedFile, req.Isaudio, req.fileIntegrity);
    // Check if is autorized, Setting up in MulterMiddleware
    if (!req.AutorizedFile || !req.Isaudio || !req.fileIntegrity)
      return res
        .status(403)
        .json({ error: "Un fichier de type mp3, wav est attendu !" });

    let validated = validator(req.body, { sessionid: "int" }); // Check if we have session id

    let lastAudio = await models.Audio.findOne({
      order: [["id", "DESC"]],
    });

    let lastid = lastAudio == null ? 1 : lastAudio.id + 1;

    // Create audio entity from source import song on use account
    let audio = await models.Audio.create(
      {
        name: req.filename,
        imported_date: req.fileInfos.date,
        userID: req.user.id,
        public: false,
        src: process.env.APP_URL + "/api/audio/" + lastid,
        // User: req.user,
      }
      // { include: models.User }
    ).catch((error) => {
      console.log(error);
      return res.status(403).json({
        message: "Une erreur est survenue veuillez essayer ultérieurement",
      });
    });

    if (validated.failsSize === 0) {
      let session_track = await models.SessionTrack.create({
        sessionid: validated.validated.sessionid,
        audioid: audio.dataValues.id,
        userid: req.user.id,
        muted: false,
        color: "green",
        src: process.env.APP_URL + "/api/pist/" + audio.id,
        gain: 0.5,
      }).catch((error) => {
        console.log(error);
      });
      return res.status(200).json({
        import: audio.dataValues,
        session_track: session_track,
        test: exclude(audio, ["updatedAt", "createdAt"]),
      });
    }

    return res.status(200).json({
      src: process.env.APP_URL + "/api/pist/" + audio.id,
      ...audio.dataValues,
    });
  },

  update: async function (req, res) {
    console.log("okok updates");
    let validated = validator(req.body, {
      fields: "string",
      datas: "string",
      id: "int|required",
    });

    if (validated.failsSize > 0) return res.status(400).json(validated.fails);

    let fields = validated.validated.fields.split("|");
    let datas = validated.validated.datas.split("|");
    let fieldsPist = ["name", "public"];
    let audio = await models.Audio.findOne({
      where: { id: validated.validated.id },
      // attributes: fieldsPist,
    });

    console.log(audio);
    if (!audio)
      return res.status(400).json({ error: "La pist n'existe pas !" });
    if (audio.userID !== req.user.id)
      return res
        .status(400)
        .json({ error: "Vous n'ête pas autorisé à modifier cet pist" });

    for (let i = 0; i < fields.length; i++) {
      if (fieldsPist.includes(fields[i])) {
        try {
          audio.set({ [fields[i]]: datas[i] }); // {name: 'pistname'}
          await audio.save();
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: "Une erreur est survenue, veuillez réesayer plus tard",
          });
        }
      }
    }

    return res.status(200).json();
  },

  delete: async function (req, res) {
    // Validate input parameters
    let validated = validator(req.params, { id: "int" });
    if (validated.fails.length > 0)
      return res.status(403).json({ errors: validated.fails });

    try {
      // Find the audio entry by ID
      let pist = await models.Audio.findOne({
        where: { id: validated.validated.id },
      });

      // If the entry doesn't exist, return an error response
      if (!pist)
        return res.status(400).json({ error: "La pist n'existe plus !" });

      // Check if the user is authorized to delete the entry
      if (pist.userID !== req.user.id)
        return res.status(401).json({
          error: "Vous n'êtes pas autorisé à supprimer cette donnée !",
        });

      // Destroy entry in the database
      await pist.destroy();
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite !" });
    }

    // Return a success response
    return res.status(200).json({ message: "La pist a bien été supprimée !" });
  },

  deleteIn: async function (req, res) {
    // Get Para
    let validated = validator(req.params, { pistid: "int" });
    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    let pistSessionTrack = await models.SessionTrack.findOne({
      where: { id: validated.validated.pistid },
    });

    pistSessionTrack.destroy();
    pistSessionTrack.save();

    return res.status(200).json();
  },

  checkWherePistIsImported: async function () {
    let validated = validator(req.body, { pistid: "int" });
    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    let SessionTrackSession = models.SessionTrack.findAll({
      where: { pistid: validated.validated.pistid },
    });

    return res.status(200).json(SessionTrackSession);
  },

  importInFromPistID: async function (req, res) {
    // Get session id and import id
    let validated = validator(req.body, { sessionid: "int", audioid: "int" });
    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    let Import = await models.Import.findOne({
      where: { userid: req.user.id, id: validated.validated.audioid },
      attributes: ["id", "userID", "name", "imported_date"],
    }).catch((error) => console.log(error));

    let importIn = await models.SessionTrack.create({
      sessionid: validated.validated.sessionid,
      audioid: validated.validated.audioid,
      userid: req.user.id,
      selected: true,
      color: "green",
      src: "/api/pist/" + validated.validated.audioid,
      gain: 50,
    }).catch((error) => {
      console.log(error);
    });

    return res.status(200).json({
      name: Import.dataValues.name,
      ...importIn.dataValues,
    });
  },

  getImported: async function (req, res) {
    let validated = validator(req.params, { sessionid: "int" });

    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    let session = await models.Session.findOne({
      where: { id: validated.validated.sessionid },
      include: [
        {
          model: models.SessionTrack,
          include: [{ model: models.Import }],
        },
      ],
    });

    if (session.dataValues.userid !== req.user.id)
      return res
        .status(401)
        .json({ error: "Vous ne pouvez accédé à cet ressource" });

    let SessionTrack = [];
    session.dataValues.SessionTracks.forEach((imported) => {
      SessionTrack.push(imported);
    });

    return res.status(200).json(SessionTrack);
  },

  UpdatePist: async function (req, res) {
    let validated = validator(req.body, {
      pistid: "int",
      field: "string",
      value: "string",
    });

    if (validated.fails.length > 0)
      return res.status(400).json(validated.fails);

    let pist = await models.SessionTrack.findOne({
      where: { id: validated.validated.pistid },
    });

    let updatable = Object.keys(pist.dataValues);

    if (!updatable.includes(validated.validated.field))
      return res.status(400).json({ error: "" });
    pist[validated.validated.field] = validated.validated.value;
    pist.save();

    return res.status(200).json();
  },
};
