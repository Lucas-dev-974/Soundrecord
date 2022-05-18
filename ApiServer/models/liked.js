'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.Liked.belongsTo(models.User)
    }
  };
  Liked.init({
    userid: DataTypes.INTEGER,
    model: DataTypes.STRING,
    modelid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liked',
  });
  return Liked;
};