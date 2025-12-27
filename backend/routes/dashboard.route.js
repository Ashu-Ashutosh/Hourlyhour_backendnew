const express = require("express");
const { authenticated } = require("../middlewares/auth.middleware");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller");
// 🔹 Provider Dashboard
router.get(
  "/provider/dashboard",
  authenticated,
  DashboardController.getDashboardStats
);
router.post(
  "/admin/dashboard",
  //   authenticated,
  DashboardController.getDashboardStatsadmmin
);

module.exports = router;
