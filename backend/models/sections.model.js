"use strict";

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      type: {
        type: DataTypes.ENUM("manual", "auto"),
        defaultValue: "manual",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "Sections",
      timestamps: true,
    }
  );

  Section.associate = (models) => {
    Section.belongsToMany(models.Service, {
      through: "SectionProducts",
      foreignKey: "sectionId",
      otherKey: "serviceId",
    });
  };

  return Section;
};
