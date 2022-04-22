'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
    }
  };
  
  Categorie.init({
    name:    DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categorie;
};