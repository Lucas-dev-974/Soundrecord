const models = require("../models");
const { validator, manageCatchErrorModel } = require("../utils");
const { GetPagination, GetPagingDatas } = require("../utils.js");

module.exports = {
  get: async function (req, res) {
    // Get the session id from url params
    let id = req.params.sessionid;
    if (isNaN(id) == true)
      return res.status(400).json({ error: "L'id renseigner est incorrect !" });

    let session = await models.Session.findOne({
      where: { id: id, userid: req.user.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).catch((error) => {
      console.log(error);
    });

    session.dataValues.tracks = await session.getTracks(models);
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

    const sessions = await models.Session.findAndCountAll({
      where: { userid: req.user.id },
      attributes: { exclude: [] },
      limit: limit,
      offset: offset,
    }).catch((error) => {
      console.log(error);
    });

    for (const session of sessions.rows) {
      session.dataValues.tracksCount = (await session.getTracks(models)).count;
    }

    return res.status(200).json(GetPagingDatas(sessions, page, limit));
  },

  delete: async function (req, res) {
    const validated = validator(req.params, { sessionid: "int|required" });
    if (validated.failsSize > 0) return res.status(400).json(validated);

    const session = await models.Session.findByPk(validated.sessionid).catch(
      (error) => console.log(error)
    );

    console.log("Session:", session);
    if (!session)
      return res.status(400).json({ error: "La session n'existe pas." });

    await session.destroy();

    return res.status(200).json(session.dataValues.id);
  },

  create: async function (req, res) {
    let validated = validator(req.body, { name: "string|required" });
    if (validated.errors) return res.status(400).json(validated.errors);

    let session = await models.Session.create({
      session_name: validated.name ?? "Untilted",
      userid: req.user.id,
      userid: req.user.id,
      public: false,
    }).catch(() => {
      return res.status(403).json({
        message: "Une erreur est survenue, veuillez essayé ultérieurement",
      });
    });

    session.dataValues.tracks = [];
    return res.status(200).json(session);
  },

  update: async function (req, res) {
    let validated = validator(req.body, {
      sessionid: "int|required",
      field: "string|required",
      value: "any|required",
    });

    if (validated.errors) return res.status(403).json(validated.errors);
    console.log("kok");
    const session = await models.Session.findOne({
      where: { id: validated.sessionid },
    });

    if (!session) {
      return res.status(400).json({ error: "La session n'existe pas !" });
    }

    if (session.userid !== req.user.id) {
      return res
        .json(402)
        .json({ error: "Vous n'ête pas autoriser à modifié cet ressource" });
    }

    try {
      await session.set(validated.field, validated.value);
      await session.save();
      return res.json(session);
    } catch (error) {
      return manageCatchErrorModel(res, error);
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

    console.log("LAST AUDIO:", lastAudio);
    let lastid = lastAudio == null ? 1 : lastAudio.id + 1;

    // Create audio entity from source import song on use account
    const audio = await models.Audio.create({
      name: req.filename,
      imported_date: req.fileInfos.date,
      userid: req.user.id,
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
      sessionid: validated.sessionid,
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

    const audio = await checkExistingByID(models.Audio, validated.audioid);

    if (audio.message != undefined) {
      return res.status(404).json(audio.message);
    }

    // Duplicate file

    // const originalAudioPath =
    //   StoragePath(req.user.id) + audio.imported_date + "-" + audio.name;

    // const NewAudioPath =
    //   StoragePath(req.user.id) +
    //   validated.sessionid +
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
      userid: req.user.id,
      public: false,
      src: process.env.APP_URL + "/api/audio/" + lastid,
      name: validated.sessionid + "." + audio.name,
    });

    const track = await models.SessionTrack.create({
      sessionid: validated.sessionid,
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
