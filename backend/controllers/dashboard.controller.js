const { User, Booking, AppSetting } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const providerId = req.user.id;

    // 📅 Today range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 🔧 Fetch admin commission (single row)
    const setting = await AppSetting.findByPk(1);
    const commissionPercent = setting?.adminCommissionPercent ?? 0;

    // 🔄 Parallel queries
    const [todayJobs, pendingJobs, completedJobs, grossEarnings] =
      await Promise.all([
        // Today's jobs
        Booking.count({
          where: {
            providerId,
            bookingDate: {
              [Op.between]: [startOfDay, endOfDay],
            },
          },
        }),

        // Pending jobs
        Booking.count({
          where: {
            providerId,
            status: "pending",
          },
        }),

        // Completed jobs
        Booking.count({
          where: {
            providerId,
            status: "completed",
          },
        }),

        // 💰 Gross earnings from completed bookings
        Booking.sum("priceAtBooking", {
          where: {
            providerId,
            status: "completed",
          },
        }),
      ]);

    const gross = grossEarnings || 0;
    const commissionAmount = (gross * commissionPercent) / 100;
    const netEarnings = gross - commissionAmount;

    return res.status(200).json({
      success: true,
      data: {
        todayJobs,
        pendingJobs,
        completedJobs,
        grossEarnings: Number(gross.toFixed(2)),
        commissionPercent,
        commissionAmount: Number(commissionAmount.toFixed(2)),
        totalEarnings: Number(netEarnings.toFixed(2)), // 👈 provider earning
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};
exports.getDashboardStatsadmmin = async (req, res) => {
  try {
    const setting = await AppSetting.findByPk(1);
    const commissionPercent = setting?.adminCommissionPercent ?? 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalBookings,
      pendingBookings,
      completedBookings,
      totalUsers,
      totalProviders,
      grossRevenue,
      bookingsByDay,
    ] = await Promise.all([
      // TOTAL BOOKINGS
      Booking.count(),

      // PENDING BOOKINGS
      Booking.count({
        where: { status: "pending" },
      }),

      // COMPLETED BOOKINGS
      Booking.count({
        where: { status: "completed" },
      }),

      // TOTAL USERS
      User.count({
        where: { userType: "user" },
      }),

      // TOTAL PROVIDERS
      User.count({
        where: { userType: "service_provider" },
      }),

      // GROSS REVENUE
      Booking.sum("priceAtBooking", {
        where: { status: "completed" },
      }),

      // BOOKINGS GRAPH (LAST 7 DAYS)
      Booking.findAll({
        attributes: [
          [fn("DATE", col("createdAt")), "date"],
          [fn("COUNT", col("id")), "count"],
        ],
        where: {
          createdAt: {
            [Op.gte]: sevenDaysAgo,
          },
        },
        group: [fn("DATE", col("createdAt"))],
        order: [[fn("DATE", col("createdAt")), "ASC"]],
      }),
    ]);

    const gross = grossRevenue || 0;
    const adminCommission = (gross * commissionPercent) / 100;

    res.json({
      success: true,
      data: {
        cards: {
          totalBookings,
          pendingBookings,
          completedBookings,
          totalUsers,
          totalProviders,
          grossRevenue: gross,
          adminCommission,
        },
        charts: {
          bookingsByDay,
        },
      },
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    res.status(500).json({ success: false });
  }
};
