module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Bookings", "providerId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Bookings", "providerId");
  },
};
