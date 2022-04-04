'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class session_track extends Model {
    static associate(models) {
      models.session_track.belongsTo(models.Session)
      models.session_track.belongsTo(models.Import)
    }
  };
  session_track.init({
    sessionid: DataTypes.INTEGER,
    importid:  DataTypes.INTEGER,
    userid:    DataTypes.INTEGER,
    gain:    DataTypes.FLOAT,
    muted:  DataTypes.BOOLEAN,
    color:     DataTypes.STRING,
    src:       DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'session_track',
  });
  return session_track;
};