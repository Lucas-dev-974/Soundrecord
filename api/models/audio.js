"use strict";
const { Model } = require("sequelize");

function calculateTimePassed(dateString) {
  const pastDate = new Date(dateString);
  const now = new Date();

  const timeDiff = now - pastDate;

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
  };
}

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

    async categories(models) {
      const categories = [];
      const categoriesAssociation = await models.AudioCategorie.findAll({
        where: { audioId: this.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      for (const asso of categoriesAssociation) {
        const categorie = await models.Categories.findOne({
          where: { id: asso.dataValues.categorieId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        if (categorie) categories.push(categorie.dataValues);
      }

      return categories;
    }

    async formatedTrack(models, requestUserId) {
      const track = { ...this };
      const user = await this.user(models);
      track.dataValues.categories = await this.categories(models);
      track.dataValues.creator = {
        pseudo: user.pseudo,
        picture:
          process.env.APP_URL + "/public/default" + user.picture
            ? user.picture
            : "",
      };

      const likes = await this.getLikes(models);
      track.dataValues.likes = {
        count: likes.count,
        userLike:
          likes.rows.find((item) => item.userid == requestUserId) != undefined,
      };

      track.dataValues.release = calculateTimePassed(this.createdAt);
      return track;
    }
  }

  Audio.init(
    {
      imported_date: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      public: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      src: DataTypes.STRING,
      filename: DataTypes.STRING,
      imagesrc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Audio",
    }
  );
  return Audio;
};
