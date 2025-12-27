const { Category, Service } = require("../models");

const addCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const exists = await Category.findOne({ where: { name } });
    if (exists) return res.status(400).json({ message: "Category exists" });

    const category = await Category.create({ name, description, image });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, name, description, image } = req.body;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Not found" });

    await category.update({ name, description, image });

    return res.json({ message: "Updated", category });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getAllCategories = async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Category.findAndCountAll({
      include: [{ model: Service, as: "services" }],
      order: [["id", "DESC"]],
      limit,
      offset,
      distinct: true, // IMPORTANT when using include
    });

    return res.status(200).json({
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();

    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  deleteCategory,
  getAllCategories,
  updateCategory,
  addCategory,
};
