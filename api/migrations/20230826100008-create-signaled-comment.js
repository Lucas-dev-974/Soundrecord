'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SignaledComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentid: {
        type: Sequelize.INTEGER,
        userid: {
          type: Sequelize.INTEGER,
          references: {
            model: "Comments",
            key: "id",
            onDelete: "cascade",
          }
        },
      },
      userid: {
        type: Sequelize.INTEGER,
        userid: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
            onDelete: "cascade",
          }
        },
      },
      signaledNumber: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('SignaledComments');
  }
};