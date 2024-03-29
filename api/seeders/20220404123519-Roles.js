"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        rolename: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rolename: "creator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", {}, null);
  },
};
