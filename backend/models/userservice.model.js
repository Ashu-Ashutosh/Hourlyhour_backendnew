// models/UserService.js
module.exports = (sequelize, DataTypes) => {
  const UserService = sequelize.define(
    "UserService",
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
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "UserServices",
      timestamps: true,
    }
  );
  UserService.associate = (models) => {
    UserService.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    UserService.belongsTo(models.Service, {
      foreignKey: "serviceId",
      as: "service",
    });
  };
  return UserService;
};
