const express = require("express");
const router = express.Router();
const db = require("../config/db").promise(); // Use promise wrapper for async/await

// GET /tasks - Fetch all tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks ORDER BY id DESC");
    const tasks = rows.map(task => ({
      ...task,
      assignees: task.assignees ? task.assignees.split(",") : []
    }));
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

// // POST /tasks - Add a new task
// router.post("/", async (req, res) => {
//   const { name, assignees, priority, startDate, dueDate, status } = req.body;

//   if (!name || !assignees || !priority || !startDate || !dueDate || !status) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const assigneesString = Array.isArray(assignees) ? assignees.join(",") : assignees;

//   try {
//     const [result] = await db.query(
//       "INSERT INTO tasks (name, assignees, priority, startDate, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)",
//       [name, assigneesString, priority, startDate, dueDate, status]
//     );

//     const [newTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);

//     res.status(201).json({
//       ...newTask[0],
//       assignees: newTask[0].assignees ? newTask[0].assignees.split(",") : []
//     });
//   } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ message: "Failed to add task", error: err.message });
//   }
// });
router.post("/", async (req, res) => {
  const { name, priority, status, startDate, dueDate, assignee_id, manager_id, bd_id } = req.body;

  if (!name || !priority || !status || !startDate || !dueDate) {
    return res.status(400).json({ message: "All required fields are not provided" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO tasks (name, priority, status, startDate, dueDate, assignee_id, manager_id, bd_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, priority, status, startDate, dueDate, assignee_id, manager_id, bd_id]
    );

    const [newTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);

    res.status(201).json(newTask[0]);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Failed to add task", error: err.message });
  }
});


// PUT /tasks/:id - Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, assignees, priority, startDate, dueDate, status } = req.body;

  if (!name || !assignees || !priority || !startDate || !dueDate || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const assigneesString = Array.isArray(assignees) ? assignees.join(",") : assignees;

  try {
    await db.query(
      "UPDATE tasks SET name=?, assignees=?, priority=?, startDate=?, dueDate=?, status=? WHERE id=?",
      [name, assigneesString, priority, startDate, dueDate, status, id]
    );

    const [updatedTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

    res.json({
      ...updatedTask[0],
      assignees: updatedTask[0].assignees ? updatedTask[0].assignees.split(",") : []
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Task deleted", id });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
});

module.exports = router;
