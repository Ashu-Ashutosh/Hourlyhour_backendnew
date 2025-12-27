module.exports = (sequelize, DataTypes) => {
  const ServiceRelation = sequelize.define("ServiceRelation", {
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    relatedServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ServiceRelation;
};
