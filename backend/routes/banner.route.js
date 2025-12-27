const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");

// CREATE
router.post("/", bannerController.createBanner);

// READ
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);

// UPDATE
router.put("/:id", bannerController.updateBanner);

// DELETE
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
