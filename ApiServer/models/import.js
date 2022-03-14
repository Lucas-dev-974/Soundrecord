'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    static associate(models) {
      models.Import.belongsTo(models.User)
      models.Import.hasMany(models.ImportedInProject)
    }
  };
  
  Import.init({
    userID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imported_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};