// controllers/sectionController.js
const { Section, Service } = require("../models");

exports.createSection = async (req, res) => {
  try {
    const { title, description, order, serviceIds } = req.body;
    const section = await Section.create({ title, description, order });

    if (serviceIds && serviceIds.length > 0) {
      await section.setServices(serviceIds);
    }
    const sectionWithServices = await Section.findByPk(section.id, {
      include: [{ model: Service, through: { attributes: [] } }],
    });

    res.json({ success: true, section: sectionWithServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const sections = await Section.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
      include: [
        {
          model: Service,
          through: { attributes: [] }, // hide join table
        },
      ],
    });

    res.json({ success: true, sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id, {
      include: [{ model: Service }],
    });

    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });

    res.json({ success: true, section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { title, description, type, order, isActive, serviceIds } = req.body;

    const section = await Section.findByPk(req.params.id);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });

    await section.update({ title, description, type, order, isActive });

    if (Array.isArray(serviceIds)) {
      await section.setServices(serviceIds);
    }

    res.json({ success: true, section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });

    await section.destroy();
    res.json({ success: true, message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
