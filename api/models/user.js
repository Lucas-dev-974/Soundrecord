"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Role, { onDelete: "cascade" });
      // (1) - relation with audio
      models.User.hasMany(models.Audio, { onDelete: "cascade" });
      models.User.hasMany(models.Session, { onDelete: "cascade" });
      models.User.hasMany(models.Like, { onDelete: "cascade" });
      models.User.hasMany(models.SessionTrack, { onDelete: "cascade" });
      models.User.hasMany(models.Playlist, { onDelete: "cascade" });
    }

    static updatable() {
      return {
        email: "string",
        picture: "file",
        name: "string",
        pseudo: "string",
        password: "string",
      };
    }

    static visible() {
      return [
        "id",
        "email",
        "picture",
        "name",
        "pseudo",
        "role",
        "instagram_link",
        "facebook_link",
      ];
    }

    static async getUser(models, userPseudo, loggedUser = false) {
      return await models.User.findOne();
    }

    async followers(models) {
      let followers = {};
      console.log(this.dataValues.id);
      const followingMe = await models.Follows.findAll({
        where: { userFollowed: this.dataValues.id },
      }).catch((error) => console.log(error));
      console.log("okok");

      const IFollow = await models.Follows.findAndCountAll({
        where: { userFolloweur: this.dataValues.id },
      }).catch((error) => console.log(error));

      followers = {
        followingMe: followingMe,
        IFollow: IFollow,
      };
      console.log("followers:", followers);
      return followers;
    }

    async getCountOfProductions(models) {
      return await models.Session.findAndCountAll({
        where: {
          userid: this.dataValues.id,
          mixed: { [Op.ne]: null },
        },
      });
    }

    async tracks(models, options = { public: false }) {
      const audios = await models.Audio.findAndCountAll({
        where: { userid: this.dataValues.id, public: options.public },
      });

      return audios;
    }

    async sessions(models, options = { public: false }) {
      const sessions = await models.Session.findAndCountAll({
        where: { userid: this.dataValues.id, public: options.public },
      });

      return sessions;
    }

    async playlists(models, options = { public: false }) {
      const playlists = await models.Playlist.findAndCountAll({
        where: { userid: this.dataValues.id, public: options.public },
      });

      if (playlists.rows.length == 0) return [];

      for (const playlist of playlists.rows) {
        const tracks = await models.PlaylistAudio.findAndCountAll({
          where: { playlistid: playlist.dataValues.id },
        });

        playlist.tracks == tracks;
      }

      return playlist;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      role: DataTypes.INTEGER,
      email: DataTypes.STRING,
      pseudo: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
      picture: DataTypes.STRING,
      password: DataTypes.STRING,
      facebook_link: DataTypes.STRING,
      instagram_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
