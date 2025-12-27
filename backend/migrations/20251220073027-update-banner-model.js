"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Banners", "service_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // NOT REQUIRED
      references: {
        model: "Services", // table name (plural)
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Banners", "service_id");
  },
};
