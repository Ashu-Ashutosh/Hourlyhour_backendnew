"use strict";

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address1: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address2: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      addressType: {
        type: DataTypes.STRING, // home, work, etc
        allowNull: true,
      },

      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },

      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Addresses",
      timestamps: true,
    }
  );

  // Associations
  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Address;
};
