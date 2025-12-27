module.exports = (sequelize, DataTypes) => {
  const RazorpayConfig = sequelize.define(
    "RazorpayConfig",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1, // always 1
      },

      keyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      keySecret: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      webhookSecret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "razorpay_config",
      timestamps: true,
    }
  );

  return RazorpayConfig;
};
