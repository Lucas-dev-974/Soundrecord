'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mixed', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sessions',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      },

      name: {
        type: Sequelize.STRING
      },

      path: {
        type: Sequelize.STRING
      },

      public: {
        type: Sequelize.BOOLEAN,
        default: false
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
    await queryInterface.dropTable('mixed');
  }
};