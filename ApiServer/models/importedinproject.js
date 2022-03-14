'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class ImportedInProject extends Model {
    static associate(models) {
      models.ImportedInProject.belongsTo(models.Session)
      models.ImportedInProject.belongsTo(models.Import)
    }
  };
  ImportedInProject.init({
    sessionid: DataTypes.INTEGER,
    importid:  DataTypes.INTEGER,
    userid:    DataTypes.INTEGER,
    volume:    DataTypes.FLOAT,
    selected:  DataTypes.BOOLEAN,
    color:     DataTypes.STRING,
    url:       DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'ImportedInProject',
  });
  return ImportedInProject;
};