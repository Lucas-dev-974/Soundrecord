"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Audio extends Model {
    static associate(models) {
      models.Audio.belongsTo(models.User);
      models.Audio.hasMany(models.SessionTrack, { onDelete: "CASCADE" });
    }
  }

  Audio.init(
    {
      imported_date: DataTypes.STRING,
      userID: DataTypes.INTEGER,
      public: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      src: DataTypes.STRING,
      // TODO: add src: source file the link to the audio
    },
    {
      sequelize,
      modelName: "Audio",
    }
  );
  return Audio;
};
