"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("razorpay_config", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: 1,
      },

      keyId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      keySecret: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      webhookSecret: {
        type: Sequelize.STRING,
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

  async down(queryInterface) {
    await queryInterface.dropTable("razorpay_config");
  },
};
