"use strict";

module.exports = (sequelize, DataTypes) => {
  const SectionProducts = sequelize.define(
    "SectionProducts",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "SectionProducts",
      timestamps: false,
    }
  );

  return SectionProducts;
};
