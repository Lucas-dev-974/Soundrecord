"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log("playlist associate");
      models.Comment.belongsTo(models.User, {
        foreignKey: "userid",
      });
    }

    async tracks(models) {
      const playlistTracks = await models.PlaylistAudio.findAndCountAll({
        where: { playlistid: this.id },
      });

      const bufferTrack = [];
      for (const pTrack of playlistTracks.rows) {
        const track = await models.Audio.findByPk(pTrack.dataValues.audioid);
        track.dataValues.likes = await track.getLikes(models);
        track.dataValues.creator = await track.user(models);
        bufferTrack.push(track.dataValues);
      }

      playlistTracks.rows = bufferTrack;

      return playlistTracks;
    }

    async user(models) {
      return await models.User.findByPk(this.userid);
    }
  }
  Playlist.init(
    {
      userid: DataTypes.INTEGER,
      name: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );

  return Playlist;
};
