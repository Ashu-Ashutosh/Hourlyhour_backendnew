const express = require("express");
const router = express.Router();
const appSettingController = require("../controllers/setting.controller");

// GET
router.get("/", appSettingController.getSetting);

// CREATE / UPDATE
router.post("/", appSettingController.saveSetting);

// DELETE
router.delete("/", appSettingController.deleteSetting);

module.exports = router;
