"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Bookings", "bookingTime", {
      type: Sequelize.TIME,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback to previous state (DATETIME)

    await queryInterface.changeColumn("Bookings", "bookingTime", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
