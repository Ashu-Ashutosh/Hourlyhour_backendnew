"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      shortDescription: {
        type: Sequelize.STRING,
      },

      fullDescription: {
        type: Sequelize.TEXT,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      mainimage: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // ARRAY does not work in MySQL → using JSON
      images: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Services");
  },
};
