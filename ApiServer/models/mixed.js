'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mixed extends Model {
    static associate(models) {
      // models.Mixed.belongsTo(models.Session)
      // models.Mixed.belongsTo(models.User)
    }
  };
  
  Mixed.init({
    sessionid: DataTypes.INTEGER,
    userid:    DataTypes.INTEGER,
    name:      DataTypes.STRING,
    path:      DataTypes.STRING,
    public:    DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'mixed',
  });
  return Mixed;
};