'use strict';
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
        type: Sequelize.INTEGER,
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
      fields: ['id', 'name', 'email'],
      type: Sequelize.INTEGER,
      name: 'fkey_audio_user', // optional
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).catc(error => console.log(error))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Imports');
  }
};