const express = require("express");
const bcrypt = require("bcryptjs"); // Make sure this is required
const jwt = require("jsonwebtoken"); // Make sure this is required
const db = require("../config/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "anvq amlq uqxf xzci"; // Ensure a secret is defined

// THIS IS THE REGISTER ROUTE YOU NEED ACTIVE
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database error during registration check:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Password hashing failed:", err);
        return res.status(500).json({ message: "Password hashing failed" });
      }

      const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
          console.error("User creation failed:", err);
          return res.status(500).json({ message: "User creation failed" });
        }
        res.status(201).json({ message: "User registered successfully", id: result.insertId });
      });
    });
  });
});

// THIS IS THE LOGIN ROUTE YOU NEED ACTIVE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database error during login check:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison failed:", err);
        return res.status(500).json({ message: "Password comparison failed" });
      }
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ message: "Login successful", token, role: user.role });
    });
  });
});

module.exports = router;