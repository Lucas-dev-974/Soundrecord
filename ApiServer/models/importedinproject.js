'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportedInProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ImportedInProject.hasOne
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