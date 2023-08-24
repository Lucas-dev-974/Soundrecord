"use strict";
const { Model } = require("sequelize");
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
  }
  // TODO: Create one liked-profile & liked-audio models and migrations 
  Liked.init(
    {
      userid: DataTypes.INTEGER,
      model: DataTypes.STRING,// ? audio, profile
      modelid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Liked;
};
