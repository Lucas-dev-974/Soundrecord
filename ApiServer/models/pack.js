'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pack extends Model {
    static associate(models) {
      // models.Pack.belongsTo(models.Mixed)
    }
  };
  
  Pack.init({
    mixedid: DataTypes.INTEGER,
    name:    DataTypes.STRING,
    path:    DataTypes.STRING
  }, {
    sequelize,
    modelName: 'packs',
  });
  return Pack;
};