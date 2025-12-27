const db = require("../models");
const RazorpayConfig = db.RazorpayConfig;

/**
 * GET Razorpay Config
 */
exports.getConfig = async (req, res) => {
  try {
    const config = await RazorpayConfig.findByPk(1);

    if (!config) {
      return res.json({ data: null });
    }

    res.json({ data: config });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * CREATE or UPDATE Razorpay Config (Upsert)
 */
exports.saveConfig = async (req, res) => {
  try {
    const { keyId, keySecret, webhookSecret } = req.body;

    if (!keyId || !keySecret) {
      return res
        .status(400)
        .json({ message: "keyId and keySecret are required" });
    }

    const [config] = await RazorpayConfig.upsert({
      id: 1,
      keyId,
      keySecret,
      webhookSecret,
    });

    res.json({
      message: "Razorpay config saved successfully",
      data: config,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE Razorpay Config
 */
exports.deleteConfig = async (req, res) => {
  try {
    await RazorpayConfig.destroy({ where: { id: 1 } });

    res.json({ message: "Razorpay config deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
