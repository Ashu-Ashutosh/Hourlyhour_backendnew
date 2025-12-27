"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // name of Target table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Services",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      bookingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      bookingTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      specialNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          "pending",
          "confirmed",
          "on_the_way",
          "completed",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },

      priceAtBooking: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop ENUM before dropping table (important for Postgres)
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_Bookings_status";`
    );

    await queryInterface.dropTable("Bookings");
  },
};
