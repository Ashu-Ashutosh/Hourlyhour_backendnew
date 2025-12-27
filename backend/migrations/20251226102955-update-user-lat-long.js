"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "latitude");
    await queryInterface.removeColumn("Users", "longitude");
  },
};
