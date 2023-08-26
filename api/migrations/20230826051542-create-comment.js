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
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        reference: {
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
        reference: {
          model:"Comments",
          key: "id",
          allowNull: true
        }
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