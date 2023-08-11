const models = require("../models/");
const { validator } = require("../utils.js");

const _models = ["creation", "creator", "pack"];
module.exports = {
  get: async function (req, res) {
    console.log(req.query);
    const validated = validator(req.query, { model: "string", modelid: "int" });
    if (validated.errorSize > 0)
      return res.status(403).json({ error: "Désoler une erreur est survenue" });

    if (!_models.includes(validated.validated.model))
      return res
        .status(403)
        .json({ error: "Désoler l'entité demandé ne peux être transmit" });

    const likes = await models.Liked.findAll({
      where: {
        modelid: validated.validated.modelid,
        model: validated.validated.model,
      },
    });
    return res.status(200).json(likes);
  },

  like: async function (req, res) {
    const validated = validator(req.body, { model: "string", modelid: "int" });
    if (validated.errorSize > 0)
      return res.status(403).json({ error: "Désoler une erreur est survenue" });

    if (!_models.includes(validated.validated.model))
      return res
        .status(403)
        .json({ error: "Désoler l'entité demandé ne peux être transmit" });

    let like = await models.Liked.findOne({
      where: {
        model: validated.validated.model,
        userid: req.user.id,
        modelid: validated.validated.modelid,
      },
    });

    if (like) {
      like.destroy();
      return res.status(200).json({
        status: "Like retirer",
        destroyed_like: true,
      });
    } else {
      like = await models.Liked.create({
        model: validated.validated.model,
        userid: req.user.id,
        modelid: validated.validated.modelid,
      });
    }
    return res.status(200).json(like);
  },
};
