const express = require("express")
const router = express.Router()
const db = require("../config/db")
const verifyToken = require("../middleware/auth")

// Get all users (admin only)
router.get("/users", verifyToken(["admin"]), (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

// Get all tasks (admin only)
router.get("/tasks", verifyToken(["admin"]), (req, res) => {
  db.query(
    "SELECT t.*, u.name as assigned_to_name FROM tasks t LEFT JOIN users u ON t.assigned_to = u.id",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(results)
    },
  )
})

module.exports = router
