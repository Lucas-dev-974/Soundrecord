"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Audio extends Model {
    static associate(models) {
      models.Audio.belongsTo(models.User, {
        foreignKey: "userid",
        as: "User",
      });
      models.Audio.hasMany(models.SessionTrack, { onDelete: "CASCADE" });
    }

    async getLikes(models) {
      return await models.Like.findAndCountAll({
        where: {
          model: "audio",
          modelid: this.id,
        },
      });
    }

    async user(models) {
      return await models.User.findOne({
        where: { id: this.userid },
        attributes: ["pseudo", "picture"],
      });
    }
  }

  Audio.init(
    {
      imported_date: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      public: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      src: DataTypes.STRING,
      imagesrc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Audio",
    }
  );
  return Audio;
};
