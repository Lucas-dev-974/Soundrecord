'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Role, { onDelete: 'cascade' })
      models.User.hasMany(models.Import, { onDelete: 'cascade' })
      models.User.hasMany(models.Session, { onDelete: 'cascade' })
    }
  };
  User.init({
    email:    DataTypes.STRING,
    name:     DataTypes.STRING,
    password: DataTypes.STRING,
    roleid:  DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};