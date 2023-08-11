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
  }
  sequelizePaginate.paginate(Session);
  Session.init(
    {
      userid: DataTypes.INTEGER,
      session_name: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
      mixed: DataTypes.STRING,
      // TODO: add audio relation, audio can be null | audio is issued of session mix | maybe can i save multiple audio ?
    },
    {
      sequelize,
      modelName: "Session",
    }
  );

  return Session;
};
