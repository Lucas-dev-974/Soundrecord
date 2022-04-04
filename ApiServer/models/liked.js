'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Liked extends Model {
    static associate(models) {
      // models.Liked.belongsTo(models.User,  { onDelete: 'cascade' })
    }
  };
  
  Liked.init({
    userid:  DataTypes.INTEGER,
    model:   DataTypes.STRING,
    modelid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'liked',
  });
  return Liked;
};