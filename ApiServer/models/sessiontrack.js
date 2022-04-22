'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionTrack extends Model {
    static associate(models) {
      models.SessionTrack.belongsTo(models.Session)
      models.SessionTrack.belongsTo(models.Import)
      models.SessionTrack.belongsTo(models.User)
    }
  };
  SessionTrack.init({
    sessionid: DataTypes.INTEGER,
    importid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    gain: DataTypes.DECIMAL,
    muted: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    src: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SessionTrack',
  });
  return SessionTrack;
};