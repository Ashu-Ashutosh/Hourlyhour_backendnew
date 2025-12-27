const { Sequelize, Op } = require("sequelize");
const { User } = require("../models");

const getNearbyOnlineProviders = async (
  latitude,
  longitude,
  onlineProviderIds,
  radiusKm = 20
) => {
  if (!latitude || !longitude || onlineProviderIds.length === 0) return [];

  return User.findAll({
    where: {
      id: onlineProviderIds,
      userType: "service_provider",
      latitude: { [Op.ne]: null },
      longitude: { [Op.ne]: null },

      [Op.and]: Sequelize.where(
        Sequelize.literal(`
          6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude}))
            * sin(radians(latitude))
          )
        `),
        "<=",
        radiusKm
      ),
    },
    attributes: ["id"],
  });
};
module.exports = { getNearbyOnlineProviders };
