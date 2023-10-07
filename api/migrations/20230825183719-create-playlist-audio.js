'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlaylistAudios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      audioid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Audios",
          key: "id",
          onDelete: "cascade",
        }
      },
      playlistid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Playlists",
          key: "id",
          onDelete: "cascade",
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlaylistAudios');
  }
};