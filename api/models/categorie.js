"use strict";
const { Model } = require("sequelize");
const { GetPagingDatas } = require("../utils");

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {}

    async tracks(models, limit = 5, offset = 0, page = 0) {
      const assos = await models.AudioCategorie.findAndCountAll({
        where: { categorieId: this.id },
        limit: limit,
        offset: offset,
      }).catch((error) => {
        console.log("ERRROOOR", error);
      });

      for (const asso of assos.rows) {
        const track = await asso.track(models);
        const formatedTrack = await track.formatedTrack(models);
        console.log("TRACK:", formatedTrack.dataValues);
        asso.dataValues = formatedTrack.dataValues;
      }

      const response = GetPagingDatas(assos, page, limit);
      return response;
    }
  }

  Categorie.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categorie;
};
