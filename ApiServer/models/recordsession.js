'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.RecordSession.belongsTo(models.Text)
      models.RecordSession.hasMany(models.ImportedInProject)

    }
  };
  RecordSession.init({
    user: DataTypes.INTEGER,
    session_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecordSession',
  });
  return RecordSession;
};