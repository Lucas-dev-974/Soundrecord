const { validator } = require("../utils.js");
const models = require("../models");
const playlist = require("../models/playlist.js");

module.exports = {
  all: async function (req, res) {
    const playlists = await models.Playlist.findAll({
      where: { userid: req.user.id },
    });
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

  add: async function (req, res) {
    const validated = validator(req.body, {
      name: "string|required",
    });

    if (validated.errors) req.status(400).json(validated.errors);

    const playlist = await models.Playlist.create({
      name: validated.name,
      userid: req.user.id,
    });

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

    playlist.destroy();
    return res.status(200).json(true);
  },

  addAudio: async function (req, res) {
    const validated = validator(req.body, {
      playlistid: "int|required",
      audioid: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const audio = await models.Audio.findOne({
      where: { id: validated.audioid },
    });
    if (!audio) return res.status(404).json("L'audio n'existe plus.");
    if (!audio.public && audio.userid != req.user.id)
      return res
        .status(401)
        .json("Désoler vous ne pouvez pas ajouter cet audio");

    const playlist = await models.Playlist.findOne({
      where: { id: validated.playlistid },
    });
    if (!playlist || playlist.userid != req.user.id)
      return res.status(404).json("Vous ne pouvez pas accédé à cet playlist.");

    const playlistAudio = await models.PlaylistAudio.findOrCreate({
      where: {
        audioid: validated.audioid,
        playlistid: validated.playlistid,
      },
    }).catch((error) => console.log(error));
    return res.status(200).json(playlistAudio);
  },

  removeAudio: async function (req, res) {
    const validated = validator(req.body, {
      playlistid: "int|required",
      audioid: "int|required",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const playlist = await models.Playlist.findOne({
      where: { id: validated.playlistid },
    });
    if (!playlist) return res.status(404).json("La playlist n'existe pas.");

    const playlistAudio = await models.PlaylistAudio.findOne({
      where: validated,
    });
    if (!playlistAudio)
      return res.status(404).json("L'audio n'existe pas dans la playlist.");

    playlistAudio.destroy();
    return res.status(200).json(true);
  },
};
