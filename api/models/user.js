"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Role, { onDelete: "cascade" });
      models.User.hasMany(models.Audio, { onDelete: "cascade" });
      models.User.hasMany(models.Session, { onDelete: "cascade" });
      models.User.hasMany(models.Like, { onDelete: "cascade" });
      models.User.hasMany(models.SessionTrack, { onDelete: "cascade" });
      models.User.hasMany(models.Playlist, { onDelete: "cascade" })
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
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      pseudo: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      picture: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
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
