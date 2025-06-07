// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const db = require("../config/db");

// // 🔓 No authentication – all users can register

// // ✅ Register a new user (simulate role as 'admin')
// router.post("/add", (req, res) => {
//   const { name, email, password, role, teamleader_id } = req.body;
//   const created_by = 1; // 🔧 Simulated created_by (admin ID)
//   const userRole = "admin"; // 🔧 Simulated role

//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (!["admin", "manager", "teamleader"].includes(userRole)) {
//     return res.status(403).json({ message: "You are not allowed to register users" });
//   }

//   // Check if email already exists
//   db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//     if (err) return res.status(500).json({ message: "DB error", error: err.message });
//     if (results.length) return res.status(409).json({ message: "Email already registered" });

//     const hashedPassword = bcrypt.hashSync(password, 8);
//     const sql = "INSERT INTO users (name, email, password, role, teamleader_id) VALUES (?, ?, ?, ?, ?)";

//     db.query(
//       sql,
//       [name, email, hashedPassword, role, role === "client" ? teamleader_id : null],
//       (err, result) => {
//         if (err) return res.status(500).json({ message: "Registration failed", error: err.message });
//         res.status(201).json({ message: "User registered successfully", id: result.insertId });
//       }
//     );
//   });
// });

// module.exports = router;
