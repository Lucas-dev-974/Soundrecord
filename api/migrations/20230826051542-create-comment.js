'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      audioid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Audios",
          key: "id",
          onDelete: "cascade",
        }
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          onDelete: "cascade",
        }
      },
      content: {
        type: Sequelize.TEXT
      },
      responseof: {
        type: Sequelize.INTEGER,
        references: {
          model:"Comments",
          key: "id",
          allowNull: true
        }
      },
      enable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};