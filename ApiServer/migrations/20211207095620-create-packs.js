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
      mixedid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mixed',
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
    await queryInterface.dropTable('packs');
  }
};