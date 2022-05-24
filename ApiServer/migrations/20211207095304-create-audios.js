'use strict';

const models = require('../models/')
const self = module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Imports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      imported_date: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      public: {
        allowNull: false,
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

    self.foreign(queryInterface, Sequelize)
  },

  foreign: async  (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Imports', {
      fields: ['userID'],
      type: DataTypes.INTEGER,
      name: 'fkey_audio_user', // optional
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Imports');
  }
};