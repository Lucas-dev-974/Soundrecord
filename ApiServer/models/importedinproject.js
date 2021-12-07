'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImportedInProject extends Model {
    static associate(models) {
      models.ImportedInProject.hasMany(models.Import)
      
      models.ImportedInProject.belongsTo(models.RecordSession, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  ImportedInProject.init({
    recordsession_id: DataTypes.INTEGER,
    import_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImportedInProject',
  });
  return ImportedInProject;
};