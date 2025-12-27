const axios = require("axios");

const TWO_FACTOR_API_KEY = process.env.OTP_FACTOR_KEY;

/**
 * Send OTP via 2Factor
 * @param {string} phone - 10 digit mobile number
 * @param {number} otp - generated OTP
 * @returns {Promise<boolean>}
 */
const sendOtptoPhone = async (phone, otp) => {
  try {
    if (!phone || !otp) {
      throw new Error("Phone and OTP are required");
    }

    const url = `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/${otp}/OTP`;

    const response = await axios.get(url);

    if (response.data?.Status === "Success") {
      return true;
    }

    console.error("2Factor error:", response.data);
    return false;
  } catch (error) {
    console.error("Send OTP failed:", error.message);
    return false;
  }
};

module.exports = sendOtptoPhone;
