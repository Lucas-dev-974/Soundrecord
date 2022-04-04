'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session_tracks', {
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
      importid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'imports',
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

      muted: {
        type: Sequelize.BOOLEAN,
      },

      color: {
        type: Sequelize.STRING
      },

      src: {
        type: Sequelize.STRING
      },

      gain: {
        type: Sequelize.FLOAT
      },

      type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('session_tracks');
  }
};