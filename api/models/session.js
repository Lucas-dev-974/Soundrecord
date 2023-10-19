"use strict";
const sequelizePaginate = require("sequelize-paginate");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      models.Session.hasMany(models.SessionTrack);
      models.Session.belongsTo(models.User, {
        foreignKey: {
          name: "userid",
          field: "userid",
          allowNull: true,
        },
        targetKey: "id",
        as: "user",
      });
    }

    async getTracks(models){
      return await models.SessionTrack.findAndCountAll({
        where: {
          sessionid: this.dataValues.id
        }
      })
    }

  }
  sequelizePaginate.paginate(Session);
  Session.init(
    {
      userid: DataTypes.INTEGER,
      session_name: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
      mixed: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );

  return Session;
};
