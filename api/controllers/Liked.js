const models = require("../models/");
const { validator } = require("../utils.js");

const _models = ["creation", "creator", "pack"];
module.exports = {
  get: async function (req, res) {
    const validated = validator(req.query, { model: "string", modelid: "int" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    if (!_models.includes(validated.model))
      return res
        .status(403)
        .json({ error: "Désoler l'entité demandé ne peux être transmit" });

    const likes = await models.Liked.findAll({
      where: {
        modelid: validated.modelid,
        model: validated.model,
      },
    });
    return res.status(200).json(likes);
  },

  like: async function (req, res) {
    const validated = validator(req.body, { model: "string", modelid: "int" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    if (!_models.includes(validated.model))
      return res
        .status(403)
        .json({ error: "Désoler l'entité demandé ne peux être transmit" });

    let like = await models.Liked.findOne({
      where: {
        model: validated.model,
        userid: req.user.id,
        modelid: validated.modelid,
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
        model: validated.model,
        userid: req.user.id,
        modelid: validated.modelid,
      });
    }
    return res.status(200).json(like);
  },

  unlike: async function(req, res){
    //TODO: dev it !!
  }
};
