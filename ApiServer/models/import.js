'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    static associate(models) {
      models.Import.belongsTo(models.User)
      // models.Import.hasMany(models.SessionTrack)
    }
  };

  Import.init({
    imported_date: DataTypes.STRING,
    userID:        DataTypes.INTEGER,
    name:          DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};