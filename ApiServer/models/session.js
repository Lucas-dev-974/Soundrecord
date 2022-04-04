'use strict';
const sequelizePaginate = require('sequelize-paginate')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      models.Session.hasOne(models.Text)
      models.Session.hasMany(models.session_track)
      models.Session.belongsTo(models.User)
    }
  };
  sequelizePaginate.paginate(Session)
  Session.init({
    userid: DataTypes.INTEGER,
    session_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};