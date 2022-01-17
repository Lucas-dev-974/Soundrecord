'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImportedInProject extends Model {
    static associate(models) {
      models.ImportedInProject.belongsTo(models.Session, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  ImportedInProject.init({
    session_id: DataTypes.INTEGER,
    import_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImportedInProject',
  });
  return ImportedInProject;
};