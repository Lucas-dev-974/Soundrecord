const models = require("../models/");
const { validator } = require("../utils.js");

module.exports = {
  get: async function (req, res) {
    const validated = validator(req.query, { model: "string", modelid: "int" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    const likes = await models.Liked.findAll({
      where: {
        modelid: validated.modelid,
        model: validated.model,
      },
    });
    return res.status(200).json(likes);
  },

  like: async function (req, res) {
    const validated = validator(req.body, { modelid: "int" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);


    let like = await models.Like.findOrCreate({
      where: {
        model: "audio",
        userid: req.user.id,
        modelid: validated.modelid,
      },
    });

    if (!like[1]) like[0].destroy();
    
    return res.status(200).json(like);
  },


};
