const express = require("express");
const router = express.Router();
const db = require("../config/db").promise(); // Use promise wrapper for async/await

// GET /notices - Fetch all notices
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notices ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching notices", error: err.message });
  }
});

// POST /notices - Add a new notice
router.post("/", async (req, res) => {
  const { date, title, content, color } = req.body;

  if (!date || !title || !content || !color) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO notices (date, title, content, color) VALUES (?, ?, ?, ?)",
      [date, title, content, color]
    );

    const [newNotice] = await db.query("SELECT * FROM notices WHERE id = ?", [result.insertId]);

    res.status(201).json(newNotice[0]);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Failed to add notice", error: err.message });
  }
});

module.exports = router;
