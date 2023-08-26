'use strict';
const {
  Model
} = require('sequelize');


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
        foreignKey: "UserId",
      });
    }
  }
  Playlist.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });

  
  return Playlist;
};

