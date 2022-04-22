'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt')

    return queryInterface.bulkInsert('users', [
      {
        name: 'Lucas', email: 'lucas.lvn97439@gmail.com', password: bcrypt.hashSync('systemroot97439', bcrypt.genSaltSync(8)), role: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Jordan', email: 'jordan.gvl@gmail.com', password: bcrypt.hashSync('jordanpassword123', bcrypt.genSaltSync(8)), role: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Cris', email: 'cris.toran@gmail.com', password: bcrypt.hashSync('crispassword123', bcrypt.genSaltSync(8)), role: 3, createdAt: new Date(), updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',{}, null)
  }
};
