"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SectionProducts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Sections",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Services", // must match your Service table name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    // Prevent duplicate mappings
    await queryInterface.addConstraint("SectionProducts", {
      fields: ["sectionId", "serviceId"],
      type: "unique",
      name: "unique_section_service",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SectionProducts");
  },
};
