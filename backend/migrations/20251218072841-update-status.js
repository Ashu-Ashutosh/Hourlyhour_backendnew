module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "status", {
      type: Sequelize.ENUM("active", "inactive", "banned", "offline"),
      allowNull: false,
      defaultValue: "active",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "status", {
      type: Sequelize.ENUM("active", "inactive", "banned"),
      allowNull: false,
      defaultValue: "active",
    });
  },
};
