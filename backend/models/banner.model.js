module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define("Banner", {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Banner.associate = (models) => {
    Banner.belongsTo(models.Service, {
      foreignKey: "service_id",
      as: "service",
    });
  };

  return Banner;
};
