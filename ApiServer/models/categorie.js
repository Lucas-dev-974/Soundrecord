'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
      models.Import.belongsTo(models.User)
    }
  };
  
  Categorie.init({
    name:    DataTypes.STRING,
    model:   DataTypes.STRING,
    modelid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categorie;
};