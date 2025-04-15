const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified:", decoded); // Add this line
    req.user = decoded; // this will give you access to req.user.id, req.user.name, etc.
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message); // Add this line
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authenticateUser };
