'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'drill',   createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'lofi', createdAt: new Date(), updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories',{}, null)
  }
};
