const express = require("express");
const router = express.Router();

const category = require("../controllers/category.controller");
const { authenticated } = require("../middlewares/auth.middleware");

router.post(
  "/add-category",
  // authenticated,
  category.addCategory
);
router.put("/update-category", authenticated, category.updateCategory);
router.get(
  "/get-all-categories",
  // authenticated,
  category.getAllCategories
);

router.delete("/delete-category/:id", authenticated, category.deleteCategory);

module.exports = router;
