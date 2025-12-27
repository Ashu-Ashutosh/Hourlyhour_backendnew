// routes/sectionRoutes.js
const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/section.controller");

router.post(
  "/",
  //   isAdmin("admin"),
  sectionController.createSection
);
router.get("/", sectionController.getSections); // for homepage
router.get("/:id", sectionController.getSectionById);
router.put(
  "/:id",
  //   isAdmin("admin"),
  sectionController.updateSection
);
router.delete(
  "/:id",
  //   isAdmin("admin"),
  sectionController.deleteSection
);

module.exports = router;
