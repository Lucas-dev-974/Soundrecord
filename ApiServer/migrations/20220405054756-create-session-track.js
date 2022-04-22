'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SessionTracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sessions', key: 'id', onDelete: 'cascade'
        }
      },
      importid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'imports', key: 'id'
        }
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', key: 'id', onDelete: 'cascade'
        }
      },
      gain: {
        type: Sequelize.DECIMAL
      },
      muted: {
        type: Sequelize.BOOLEAN
      },
      color: {
        type: Sequelize.STRING
      },
      src: {
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
    await queryInterface.dropTable('SessionTracks');
  }
};