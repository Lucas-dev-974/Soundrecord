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
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
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

    await queryInterface.addConstraint('Imports', {
      fields: ['id', 'name', 'email'],
      type: Sequelize.UUID,
      name: 'custom_fkey_audio_user', // optional
      references: {
        table: 'Users',
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