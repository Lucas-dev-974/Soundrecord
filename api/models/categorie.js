"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {}
  }

  Categorie.init(
    {
      name: DataTypes.STRING,
      // TODO add type to define type of the category, audio categorie | track categorie
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categorie;
};
