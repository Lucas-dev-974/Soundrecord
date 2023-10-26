const fs = require("fs");
const { validator, exclude, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");

require("dotenv").config();
const { GetPagination, GetPagingDatas } = require("../utils.js");
const { StoragePath } = require("../middleware/MulterFileManager.js");
const path = require("path");

function calculateTimePassed(dateString) {
  const pastDate = new Date(dateString);
  const now = new Date();

  const timeDiff = now - pastDate;

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
  };
}

module.exports = {
  get: async function (req, res) {
    let validated = validator(req.params, { id: "int|required" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    const audio = await models.Audio.findOne({
      where: { id: validated.id },
      attributes: [
        "id",
        "userid",
        "name",
        "imported_date",
        "src",
        "public",
        "imagesrc",
        "filename",
      ],
      // include: [{ model: models.User, as: "User" }],
    });

    if (!audio)
      return res.status(403).json({ errors: "L'audio n'a pas été trouver." });

    if (!audio.dataValues.public)
      return res.status(401).json({
        message: "Vous n'êtes pas autorisé à accéder à cet ressource.",
      });

    // return res.json(audio);
    const filePath = path.resolve(
      __dirname,
      "../public/" + audio.dataValues.filename
    );
    console.log("file path:", filePath);
    if (!fs.existsSync(filePath))
      return res
        .status(403)
        .json({ error: "Le fichier audio de semble pas exister." });

    return res.sendFile(filePath);
  },

  /**
   * Library will return all imported song of one user
   * @param {Request} req
   * @param {Response} res
   */
  library: async function (req, res) {
    if (!req.userPseudo)
      return res
        .status(404)
        .json({ message: "L'utilisateur n'a pas été trouver" });

    let where = {};
    if (!req.isMyProfile) where = { public: true };

    const user = await models.User.findOne({
      where: { pseudo: req.userPseudo },
    });

    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });

    const audios = await models.Audio.findAll({
      where: { userid: user.dataValues.id, ...where },
      attributes: {
        exclude: [],
      },
    }).catch((error) => {
      return manageCatchErrorModel(res, error);
    });

    for (const audio of audios) {
      console.log("audio set like, creator", await audio.user(models));
      audio.dataValues.likes = await audio.getLikes(models);
      audio.dataValues.creator = await audio.user(models);
    }

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
    const { limit, offset } = GetPagination(req.page, req.size);
    let audios = await models.Audio.findAndCountAll({
      where: { public: true },
      // If userid is not set in this list an  error popup
      attributes: ["id", "userid", "name", "src", "imagesrc", "createdAt"],
      limit: limit,
      offset: offset,
    }).catch((error) => console.log(error));

    for (const audio of audios.rows) {
      const user = await models.User.findOne({
        where: { id: audio.dataValues.userid },
      }).catch((error) => {
        return manageCatchErrorModel(res, error);
      });

      const categories = await models.AudioCategorie.findAll({
        where: { audioId: audio.id },
      }).catch((error) => {
        return manageCatchErrorModel(res, error);
      });

      audio.dataValues.categories = [];
      for (const audioCate of categories) {
        const categorie = await models.Categories.findOne({
          where: { id: audioCate.categorieId },
        }).catch((error) => {
          return manageCatchErrorModel(res, req);
        });

        audio.dataValues.categories.push(categorie.dataValues);
      }

      audio.dataValues.creator = {
        pseudo: user.pseudo,
        picture:
          process.env.APP_URL + "/public/default" + user.picture
            ? user.picture
            : "",
      };
      const like = await models.Like.findAndCountAll({
        where: {
          model: "audio",
          modelid: audio.dataValues.id,
        },
      });

      (audio.dataValues.likes = {
        count: like.count,
        userLike: like.userid,
      }),
        (audio.dataValues.release = calculateTimePassed(
          audio.dataValues.createdAt
        ));
    }

    if (audios === undefined) return res.status(200).json({ audios: [] });
    const response = GetPagingDatas(audios, req.page, limit);
    return res.status(200).json(response);
  },

  byCategories: async function (req, res) {
    const validated = validator(req.query, {
      // * format de la chaine de caractère: 1,3,10
      categorieIds: "string",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    // Todo découper la chaine de caractère pour extraire la liste des id de catégorie
    // * format de la chaine de caractère: 1,3,10
    const categorieIds = [];
    const audiosCategorie = await models.AudioCategorie.fincdAll({
      where: {
        // Todo à revoir parceque c'est un tableau qui d'id et la je fait que pour un id de catégorie
        categorieId: validated.categorieIds,
      },
    });
  },

  /**
   * @summary Build default audio config to insert in database
   *          Return default audio config
   * @param {any} req
   * @param {any} res
   * @returns
   */
  Import: async function (req, res) {
    // console.log("AutorizedFile", req.AutorizedFile);
    // console.log("fileIntegrity", req.fileIntegrity);
    // console.log("Isaudio", req.Isaudio);
    // Check if is autorized, Setting up in MulterMiddleware
    // ! TODO review file integrity
    // if (!req.AutorizedFile || !req.Isaudio || !req.fileIntegrity)
    if (!req.AutorizedFile || !req.Isaudio)
      return res
        .status(403)
        .json({ error: "Un fichier de type mp3, wav est attendu !" });

    const lastAudio = await models.Audio.findOne({ order: [["id", "DESC"]] });
    const lastid = lastAudio == null ? 1 : lastAudio.id + 1;

    const audio = await models.Audio.create({
      name: req.orignalname,
      imported_date: Date.now(),
      userid: req.user.id,
      public: true,
      filename: req.filename,
      src: process.env.APP_URL + "/api/audio/" + lastid,
      imagesrc: process.env.APP_URL + "/api/medias/audio/default",
    }).catch((error) => {
      return manageCatchErrorModel(error);
    });

    return res.status(200).json(audio);
  },

  update: async function (req, res) {
    let validated = validator(req.body, {
      fields: "string",
      datas: "string",
      trackid: "int|required",
    });

    console.log("VALIDATED:", validated);
    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    const fields = validated.fields.split("|");
    const datas = validated.datas.split("|");
    const updatableTrackFields = ["name", "public"];

    const track = await models.Audio.findOne({
      where: { id: validated.trackid },
    });

    if (!track)
      return res.status(400).json({ error: "La pist n'existe pas !" });
    if (track.userid !== req.user.id)
      return res
        .status(400)
        .json({ error: "Vous n'ête pas autorisé à modifier cet pist" });

    for (let i = 0; i < fields.length; i++) {
      if (updatableTrackFields.includes(fields[i])) {
        try {
          console.log(
            "BIG UPDATE --------------",
            fields[i],
            datas[i],
            typeof datas[i]
          );

          if (datas[i] == "false") datas[i] = false;
          if (datas[i] == "true") datas[i] == true;

          track.set(fields[i], datas[i]);
          track.save();
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: "Une erreur est survenue, veuillez réesayer plus tard",
          });
        }
      }
    }

    return res.status(200).json(track);
  },

  delete: async function (req, res) {
    // Validate input parameters
    let validated = validator(req.params, { id: "int" });
    if (validated.errors) return res.status(403).json(validated.errors);

    // Find the audio entry by ID
    const track = await models.Audio.findOne({ where: { id: validated.id } });

    // If the entry doesn't exist, return an error response
    if (!track) return res.status(400).json({ error: "La pist n'existe pas." });

    // Check if the user is authorized to delete the entry
    if (track.userid !== req.user.id)
      return res.status(401).json({ error: "Vous n'avez pas l'autirisation" });

    try {
      // Destroy entry in the database
      await track.destroy();
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite !" });
    }

    // Return a success response
    return res.status(200).json(track.dataValues.id);
  },

  deleteIn: async function (req, res) {
    // Get Para
    let validated = validator(req.params, { pistid: "int" });
    if (validated.errors != undefined)
      return res.status(400).json(validated.fails);

    let pistSessionTrack = await models.SessionTrack.findOne({
      where: { id: validated.pistid },
    });

    pistSessionTrack.destroy();
    pistSessionTrack.save();

    return res.status(200).json();
  },

  checkWherePistIsImported: async function () {
    let validated = validator(req.body, { pistid: "int" });
    if (validated.errors != undefined)
      return res.status(400).json(validated.fails);

    let SessionTrackSession = models.SessionTrack.findAll({
      where: { pistid: validated.pistid },
    });

    return res.status(200).json(SessionTrackSession);
  },

  importInFromPistID: async function (req, res) {
    // Get session id and import id
    let validated = validator(req.body, { sessionid: "int", audioid: "int" });
    if (validated.errors != undefined)
      return res.status(400).json(validated.fails);

    let Import = await models.Import.findOne({
      where: { userid: req.user.id, id: validated.audioid },
      attributes: ["id", "userID", "name", "imported_date"],
    }).catch((error) => console.log(error));

    let importIn = await models.SessionTrack.create({
      sessionid: validated.sessionid,
      audioid: validated.audioid,
      userid: req.user.id,
      selected: true,
      color: "green",
      src: "/api/pist/" + validated.audioid,
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

    if (validated.errors != undefined)
      return res.status(400).json(validated.fails);

    let session = await models.Session.findOne({
      where: { id: validated.sessionid },
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

    if (validated.errors != undefined)
      return res.status(400).json(validated.fails);

    let pist = await models.SessionTrack.findOne({
      where: { id: validated.pistid },
    });

    let updatable = Object.keys(pist.dataValues);

    if (!updatable.includes(validated.field))
      return res.status(400).json({ error: "" });
    pist[validated.field] = validated.value;
    pist.save();

    return res.status(200).json();
  },
};
