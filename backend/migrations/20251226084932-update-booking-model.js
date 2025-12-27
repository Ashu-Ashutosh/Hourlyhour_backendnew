"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Bookings", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });

    await queryInterface.addColumn("Bookings", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Bookings", "latitude");
    await queryInterface.removeColumn("Bookings", "longitude");
  },
};
