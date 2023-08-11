"use strict";
const self = (module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Audios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      imported_date: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      src: {
        type: Sequelize.STRING,
      },
      public: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Audios");
  },
});
