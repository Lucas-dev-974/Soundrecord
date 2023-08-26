'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SignaledComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SignaledComment.init({
    commentid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    signaledNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SignaledComment',
  });
  return SignaledComment;
};