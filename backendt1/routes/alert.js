const express = require("express");
const router = express.Router();
const db = require("../config/db").promise(); // Using promise wrapper

// GET all alerts
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM alerts ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Fetch alerts error:", err);
    res.status(500).json({ message: "Error fetching alerts", error: err.message });
  }
});

// POST add a new alert
router.post("/", async (req, res) => {
  const { name, phone, date, time, message, duration, notificationType } = req.body;

  // Basic validation: require all fields
  if (!name || !phone || !date || !time || !message || !duration || !notificationType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO alerts (name, phone, date, time, message, duration, notificationType) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phone, date, time, message, duration, notificationType]
    );

    const [newAlert] = await db.query("SELECT * FROM alerts WHERE id = ?", [result.insertId]);
    res.status(201).json(newAlert[0]);
  } catch (err) {
    console.error("Insert alert error:", err);
    res.status(500).json({ message: "Failed to add alert", error: err.message });
  }
});

// PUT update an alert
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, date, time, message, duration, notificationType } = req.body;

  if (!name || !phone || !date || !time || !message || !duration || !notificationType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "UPDATE alerts SET name=?, phone=?, date=?, time=?, message=?, duration=?, notificationType=? WHERE id=?",
      [name, phone, date, time, message, duration, notificationType, id]
    );

    const [updatedAlert] = await db.query("SELECT * FROM alerts WHERE id = ?", [id]);
    res.json(updatedAlert[0]);
  } catch (err) {
    console.error("Update alert error:", err);
    res.status(500).json({ message: "Failed to update alert", error: err.message });
  }
});

// DELETE an alert
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM alerts WHERE id = ?", [id]);
    res.json({ message: "Alert deleted", id });
  } catch (err) {
    console.error("Delete alert error:", err);
    res.status(500).json({ message: "Failed to delete alert", error: err.message });
  }
});

module.exports = router;
