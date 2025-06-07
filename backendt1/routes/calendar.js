const express = require("express");
const router = express.Router();
const db = require("../config/db").promise(); // use promise for async/await

// GET all calendar tasks
router.get("/", async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM calendar_tasks ORDER BY id DESC");
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching calendar tasks", error: err.message });
  }
});

// POST a new calendar task
router.post("/", async (req, res) => {
  const { title, time, type, dateKey } = req.body;

  if (!title || !time || !type || !dateKey) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO calendar_tasks (title, time, type, dateKey) VALUES (?, ?, ?, ?)",
      [title, time, type, dateKey]
    );

    const [newTask] = await db.query("SELECT * FROM calendar_tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Failed to add calendar task", error: err.message });
  }
});

// PUT update a calendar task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, time, type, dateKey } = req.body;

  if (!title || !time || !type || !dateKey) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "UPDATE calendar_tasks SET title = ?, time = ?, type = ?, dateKey = ? WHERE id = ?",
      [title, time, type, dateKey, id]
    );

    const [updatedTask] = await db.query("SELECT * FROM calendar_tasks WHERE id = ?", [id]);
    res.json(updatedTask[0]);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update calendar task", error: err.message });
  }
});

// DELETE a calendar task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM calendar_tasks WHERE id = ?", [id]);
    res.json({ message: "Task deleted successfully", id });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete calendar task", error: err.message });
  }
});

module.exports = router;
