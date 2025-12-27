"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "rateType", {
      type: Sequelize.ENUM("fixed", "hourly", "per_service"),
      defaultValue: "fixed",
    });

    await queryInterface.addColumn("Services", "duration", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Services", "discount", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });

    await queryInterface.addColumn("Services", "isFeatured", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn("Services", "status", {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active",
    });

    await queryInterface.addColumn("Services", "tags", {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Services", "rateType");
    await queryInterface.removeColumn("Services", "duration");
    await queryInterface.removeColumn("Services", "discount");
    await queryInterface.removeColumn("Services", "isFeatured");
    await queryInterface.removeColumn("Services", "status");
    await queryInterface.removeColumn("Services", "tags");

    // Remove ENUM values to avoid MySQL errors
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Services_rateType";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Services_status";'
    );
  },
};
