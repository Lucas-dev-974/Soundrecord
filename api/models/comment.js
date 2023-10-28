"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async author(models) {
      return await models.User.findByPk(this.userid, {
        attributes: ["id", "pseudo", "picture"],
      });
    }

    async signaled(models, userid) {
      return await models.SignaledComment.findOne({
        where: { commentid: this.id, userid: userid },
      });
    }
  }
  Comment.init(
    {
      audioid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      responseof: DataTypes.INTEGER,
      enable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
