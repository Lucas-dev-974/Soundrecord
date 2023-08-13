const models = require("../models");
const { validator } = require("../utils");
const fs = require("fs");
const { returnFields, GetPagination, GetPagingDatas } = require("../utils.js");
const session = require("../models/session");
const { StoragePath } = require("../middleware/MulterFileManager");

module.exports = {
  get: async function (req, res) {
    // Get the session id from url params
    let id = req.params.sessionid;
    if (isNaN(id) == true)
      return res.status(400).json({ error: "L'id renseigner est incorrect !" });

    let session = await models.Session.findOne({
      where: { id: id, userid: req.user.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: models.SessionTrack,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [{ model: models.Import }],
        },
      ],
    }).catch((error) => {
      console.log(error);
    });

    if (!session)
      return res
        .status(400)
        .json({ error: "La session demandé n'existe pas !" });
    return res.status(200).json({ session });
  },

  all: async function (req, res) {
    let { page, size } = req.query;
    if (!size) size = 5;
    const { limit, offset } = GetPagination(page, size);
    
    let sessions = await models.Session.findAndCountAll({
      where: { userid: req.user.id },
      attributes: { exclude: ["createdAt", "updatedAt", "UserId"] },
      limit: limit,
      offset: offset,
    }).catch((error) => {
      console.log(error);
    });

    for (const key in sessions.rows) {
      const session = sessions.rows[key].dataValues;
      let audio = await models.SessionTrack.findAll({
        where: { sessionid: session.id },
      });
      sessions.rows[key].dataValues.importedIn = audio.count;
    }
    const response = GetPagingDatas(sessions, page, limit);
    return res.status(200).json(response);
  },

  delete: async function (req, res) {
    let validated = validator(req.params, { id: "int|required" });
    if (validated.failsSize > 0) return res.status(400).json(validated);

    let session = await models.Session.findByPk(validated.validated.id).catch(
      (error) => console.log(error)
    );

    if (!session || session == null)
      return res
        .status(400)
        .json({ error: "Il s'emblerais que la session n'existe pas !" });

    session.destroy();

    return res.status(200).json(true);
  },

  create: async function (req, res) {
    // Check of given data
    let validated = validator(req.body, { name: "string" });

    // let user    = await models.User.findByPk(req.user.id)
    let session = await models.Session.create({
      session_name: validated.validated.name ?? "Untilted",
      userid: req.user.id,
      UserId: req.user.id,
      public: false,
    }).catch(() => {
      return res.status(403).json({
        message: "Une erreur est survenue, veuillez essayé ultérieurement",
      });
    });

    return res.status(200).json(session);
  },

  update: async function (req, res) {
    let validated = validator(req.body, {
      id: "int|required",
      field: "string|required",
      newValue: "any|required",
    });

    if (validated.failsSize > 0) return res.status(403).json(validated.fails);

    const session = await models.Session.findOne({
      where: { id: validated.validated.id },
    });

    if (!session) {
      return res.status(400).json({ error: "La session n'existe pas !" });
    } else if (session.userid !== req.user.id) {
      return res
        .json(402)
        .json({ error: "Vous n'ête pas autoriser à modifié cet ressource" });
    }

    try {
      session.set(validated.validated.field, validated.validated.newValue);
      await session.save();
      return res.json(session);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Une erreur est survenu, veuillez réesayer plus tard !",
      });
    }
  },

  /**
   * ImportIn will import track from uploaded file in the session
   * First an Audio instance will be create
   * Then SessionTrack instance will be create with association on Audio
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  importIn: async function (req, res) {
    // Check if is autorized, Setting up in MulterMiddleware
    if (!req.AutorizedFile || !req.Isaudio || !req.fileIntegrity) {
      return res
        .status(403)
        .json({ error: "Un fichier de type mp3, wav est attendu !" });
    }

    const validated = validator(req.body, { sessionid: "int|required" }); // Check if we have session id
    let lastAudio = await models.Audio.findOne({
      order: [["id", "DESC"]],
    });

    let lastid = lastAudio == null ? 1 : lastAudio.id + 1;

    // Create audio entity from source import song on use account
    const audio = await models.Audio.create({
      name: req.filename,
      imported_date: req.fileInfos.date,
      userID: req.user.id,
      public: false,
      src: process.env.APP_URL + "/api/audio/" + lastid,
    }).catch((error) => {
      return res.status(403).json({
        message: "Une erreur est survenue veuillez essayer ultérieurement",
      });
    });

    if (validated.failsSize > 0) {
      return res.status(403).json(validated.fails);
    }

    const session_track = await models.SessionTrack.create({
      sessionid: validated.validated.sessionid,
      audioid: audio.dataValues.id,
      userid: req.user.id,
      muted: false,
      color: "green",
      src: process.env.APP_URL + "/api/audio/" + audio.id,
      gain: 0.5,
    }).catch((error) => {
      console.log(error);
    });

    return res.status(200).json({
      session_track: session_track,
    });
  },

  /**
   * This method will duplicate audio file from library to new audio file,
   * Like thats if some effect is opperated on the file the new audio with effect is saved
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  importInFromLibrary: async function (req, res) {
    const validated = validator(req.body, {
      sessionid: "int|required",
      audioid: "int|required",
    });

    if (validated.failsSize > 0) {
      return res.status(403).json(validated.fails);
    }

    const checkExistingByID = async (model, id) => {
      const response = {
        message: "",
      };

      model = await model
        .findOne({
          where: { id: id },
        })
        .catch(() => {
          response.message = "L'audio n'existe pas !";
          return res.status(403).json();
        });
      return model ?? response;
    };

    const audio = await checkExistingByID(
      models.Audio,
      validated.validated.audioid
    );

    if (audio.message != undefined) {
      return res.status(404).json(audio.message);
    }

    // Duplicate file

    // const originalAudioPath =
    //   StoragePath(req.user.id) + audio.imported_date + "-" + audio.name;

    // const NewAudioPath =
    //   StoragePath(req.user.id) +
    //   validated.validated.sessionid +
    //   "." +
    //   audio.imported_date +
    //   "-" +
    //   audio.name;

    // fs.readFile(originalAudioPath, (err, data) => {
    //   if (err) {
    //     console.error("Erreur lors de la lecture du fichier source:", err);
    //     return;
    //   }

    //   // Écriture des données lues dans le fichier de destination
    //   fs.writeFile(NewAudioPath, data, (err) => {
    //     if (err) {
    //       console.error(
    //         "Erreur lors de l'écriture dans le fichier de destination:",
    //         err
    //       );
    //       return;
    //     }
    //     console.log("Fichier dupliqué avec succès !");
    //   });
    // });

    let lastAudio = await models.Audio.findOne({
      order: [["id", "DESC"]],
    });
    let lastid = lastAudio.id + 1;

    const newAudio = await models.Audio.create({
      imported_date: audio.imported_date,
      userID: req.user.id,
      public: false,
      src: process.env.APP_URL + "/api/audio/" + lastid,
      name: validated.validated.sessionid + "." + audio.name,
    });

    const track = await models.SessionTrack.create({
      sessionid: validated.validated.sessionid,
      audioid: newAudio.id,
      userid: req.user.id,
      gain: 0.5,
      muted: false,
      color: "cyan",
      src: process.env.APP_URL + "/api/audio/" + audio.id,
    });

    return res.status(200).json(track);
  },
};
