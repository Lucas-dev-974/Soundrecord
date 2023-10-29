const { validator, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");
const playlist = require("../models/playlist.js");

module.exports = {
  all: async function (req, res) {
    if (!req.userPseudo)
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });

    let public = { public: true };
    if (req.isMyProfile) public = {};

    const playlists = await models.Playlist.findAll({
      where: { userid: req.user.id, ...public },
    });

    for (const playlist of playlists) {
      playlist.dataValues.tracks = await playlist.tracks(models);
    }
    return res.status(200).json(playlists);
  },

  one: async function (req, res) {
    const validated = validator(req.params, {
      id: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const playlistInformations = await models.Playlist.findOne({
      where: { id: validated.id },
    });

    if (playlistInformations.userid != req.user.id)
      return res.status(200).json("Vous ne pouvez pas accéder à cet ressoure.");

    const audios = await models.PlaylistAudio.findAll({
      where: { playlistid: playlistInformations.id },
    });

    playlistInformations.dataValues.audios = audios;
    return res.status(200).json(playlistInformations);
  },

  create: async function (req, res) {
    const validated = validator(req.body, {
      name: "string|required",
    });

    if (validated.errors) res.status(400).json(validated.errors);

    const playlist = await models.Playlist.create({
      name: validated.name,
      userid: req.user.id,
    });

    playlist.dataValues.tracks = await playlist.tracks(models);

    return res.status(200).json(playlist);
  },

  update: async function (req, res) {
    const validated = validator(req.body, {
      playlistid: "int|required",
      field: "string|required",
      value: "string|required",
    });

    if (validated.errors) return res.status(403).json(validated.errors);

    const playlist = await models.Playlist.findByPk(validated.playlistid).catch(
      (error) => {
        return manageCatchErrorModel(res, error);
      }
    );

    if (!playlist)
      return res.status(404).json({ message: "La playlist n'existe pas." });

    if (validated.value == "false") validated.value = false;
    if (validated.value == "true") validated.value = true;

    if (playlist.dataValues[validated.field] != undefined) {
      await playlist.set(validated.field, validated.value);
      await playlist.save();
    }

    return res.status(200).json(playlist);
  },

  remove: async function (req, res) {
    const validated = validator(req.params, {
      id: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const playlist = await models.Playlist.findOne({
      where: { id: validated.id },
    });
    if (playlist.userid != req.user.id)
      return res.status(401).json("vous n'avez pas l'authorisation !");

    const trackAssociated = await models.PlaylistAudio.findAll({
      where: { playlistid: validated.id },
    });

    for (const associatedTrack of trackAssociated) {
      associatedTrack.destroy();
    }

    playlist.destroy();
    return res.status(200).json(playlist);
  },

  addAudio: async function (req, res) {
    const validated = validator(req.body, {
      plailystid: "int|required",
      trackid: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const audio = await models.Audio.findOne({
      where: { id: validated.trackid },
    });
    if (!audio) return res.status(404).json("L'audio n'existe plus.");
    if (!audio.public && audio.userid != req.user.id)
      return res
        .status(401)
        .json("Désoler vous ne pouvez pas ajouter cet audio");

    const playlist = await models.Playlist.findOne({
      where: { id: validated.plailystid },
    });
    if (!playlist || playlist.userid != req.user.id)
      return res.status(404).json("Vous ne pouvez pas accédé à cet playlist.");

    const playlistAudio = await models.PlaylistAudio.findOrCreate({
      where: {
        audioid: validated.trackid,
        playlistid: validated.plailystid,
      },
    }).catch((error) => console.log(error));
    return res.status(200).json(playlistAudio[0]);
  },

  removeAudio: async function (req, res) {
    const validated = validator(req.params, {
      playlistid: "int|required",
      audioid: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const playlist = await models.Playlist.findOne({
      where: { id: validated.playlistid },
    });

    if (!playlist || playlist.userid != req.user.id)
      return res.status(404).json("Vous ne pouvez pas accédé à cet playlist.");

    const playlistAudio = await models.PlaylistAudio.findOne({
      where: validated,
    });
    if (!playlistAudio)
      return res.status(404).json("L'audio n'existe pas dans la playlist.");

    playlistAudio.destroy();
    return res.status(200).json(playlistAudio);
  },
};
