// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "anvq amlq uqxf xzci"; // Replace with process.env.JWT_SECRET in prod

// Verify Token and Extract User Info
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Allow Only Specific Roles
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: unauthorized role" });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
