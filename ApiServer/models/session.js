'use strict';
const sequelizePaginate = require('sequelize-paginate')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      models.Session.hasMany(models.SessionTrack)
      models.Session.belongsTo(models.User, {as: 'user', foreignKey: 'id'})
    }
  };
  sequelizePaginate.paginate(Session)
  Session.init({
    userid:       DataTypes.INTEGER,
    session_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};