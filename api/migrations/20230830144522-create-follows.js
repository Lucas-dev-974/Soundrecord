'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      userFollowed: {
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
      userFolloweur: {
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
    await queryInterface.dropTable('Follows');
  }
};