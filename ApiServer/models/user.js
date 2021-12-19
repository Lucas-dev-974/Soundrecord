'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Role, {foreignKey: 'roleID'})
      models.User.hasMany(models.Import)
      models.User.hasMany(models.RecordSession)
    }
  };
  User.init({
    email:    DataTypes.STRING,
    name:     DataTypes.STRING,
    password: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,
    roleID:  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};