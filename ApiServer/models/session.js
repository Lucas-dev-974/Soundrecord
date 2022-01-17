'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      models.Session.hasOne(models.Text)
      models.Session.hasMany(models.ImportedInProject)
      models.Session.belongsTo(models.User)
    }
  };
  Session.init({
    userid: DataTypes.INTEGER,
    session_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};