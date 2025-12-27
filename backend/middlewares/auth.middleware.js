const jwt = require("jsonwebtoken");
const { User } = require("../models");
const SECRET = process.env.JWT_SECRET || "supersecret";

exports.authenticated = async (req, res, next) => {
  try {
    // 1️⃣ Read cookie token (for browsers)
    let token = req.cookies.token;

    // 2️⃣ Read Bearer token (for Flutter/mobile)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // 3️⃣ If no token found → unauthorized
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
