"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AudioCategorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async track(models) {
      return await models.Audio.findOne({
        where: {
          id: this.audioId,
          public: true,
        },
      });
    }
  }
  AudioCategorie.init(
    {
      audioId: DataTypes.INTEGER,
      categorieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AudioCategorie",
    }
  );
  return AudioCategorie;
};
