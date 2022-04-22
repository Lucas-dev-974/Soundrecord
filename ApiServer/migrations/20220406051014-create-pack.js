'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('packs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creationid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'creations', key: 'id', onDelete: 'cascade'
        }
      },
      ownerid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', key: 'id', onDelete: 'cascade'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      public: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('packs');
  }
};