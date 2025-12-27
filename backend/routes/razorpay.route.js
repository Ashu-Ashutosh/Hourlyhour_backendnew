const express = require("express");
const router = express.Router();
const razorpayConfigController = require("../controllers/razorpay.controller");

// GET
router.get("/", razorpayConfigController.getConfig);

// CREATE / UPDATE
router.post("/", razorpayConfigController.saveConfig);

// DELETE
router.delete("/", razorpayConfigController.deleteConfig);

module.exports = router;
