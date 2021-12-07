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
      models.RecordSession.hasMany(models.ImportedInProject)
      models.RecordSession.hasOne(models.Text)
    }
  };
  RecordSession.init({
    user: DataTypes.INTEGER,
    session_name: DataTypes.STRING,
    text_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecordSession',
  });
  return RecordSession;
};