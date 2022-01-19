'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class ImportedInProject extends Model {
    static associate(models) {
      models.ImportedInProject.belongsTo(models.Session)
    }
  };
  ImportedInProject.init({
    sessionid: DataTypes.INTEGER,
    importid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImportedInProject',
  });
  return ImportedInProject;
};