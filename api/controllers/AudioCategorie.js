const {
  validator,
  manageCatchErrorModel,
  GetPagination,
  GetPagingDatas,
} = require("../utils.js");
const models = require("../models");

module.exports = {
  all: async function (req, res) {
    const { limit, offset } = GetPagination(req.page, 5);
    limit; // * Hack

    console.log("LIMIT - OFFSET:", limit, offset);
    const categories = await models.Categories.findAndCountAll({
      limit: 5,
      offset: offset,
    });

    const response = GetPagingDatas(categories, req.page, 5);
    return res.status(200).json(response);
  },

  update: async function () {},

  linkAudioToCategories: async function (req, res) {
    const validated = validator(req.body, {
      audioId: "required|int",
      categorieName: "required|string",
    });

    if (validated.errors) return res.status(400).json(validated.errors);

    const audio = await models.Audio.findOne({
      where: { id: validated.audioId },
    }).catch((error) => {
      return manageCatchErrorModel(res, error);
    });

    if (!audio)
      return res.status(404).json({ message: "L'audio n'existe pas." });

    if (audio.userid != req.user.id) {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à faire cet action." });
    }

    const categorie = await models.Categories.findOrCreate({
      where: { name: validated.categorieName },
    }).catch((error) => {
      return manageCatchErrorModel(res, error);
    });

    console.log("CATEGORIE:", categorie[0].dataValues.id);

    const audioCategorie = await models.AudioCategorie.findOrCreate({
      where: {
        audioId: audio.id,
        categorieId: categorie[0].dataValues.id,
      },
    }).catch((error) => {
      return manageCatchErrorModel(res, error);
    });

    console.log("TRACK CATEGORIE ASSO:", audioCategorie[0]);
    console.log("TRACK CATEGORIE ASSO:", audioCategorie);

    if (!audioCategorie[1]) audioCategorie[0].destroy();
    return res.status(200).json([categorie[0], audioCategorie[1]]);
  },
};
