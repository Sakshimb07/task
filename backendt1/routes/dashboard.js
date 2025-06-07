// // routes/dashboard.js
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const verifyToken = require("../middleware/auth");

// // Admin Dashboard - can view all users, tasks, leads
// router.get("/admin", verifyToken(["admin"]), (req, res) => {
//   db.query(
//     `SELECT users.id, users.name, users.email, users.role, tasks.title AS taskTitle
//      FROM users
//      LEFT JOIN tasks ON users.id = tasks.assigned_to`,
//     (err, result) => {
//       if (err) return res.status(500).json({ message: "DB error", error: err.message });
//       res.json({ dashboard: "Admin Dashboard", data: result });
//     }
//   );
// });

// // Team Leader Dashboard - only their own clients and tasks
// router.get("/teamleader", verifyToken(["teamleader"]), (req, res) => {
//   const teamLeaderId = req.user.id;
//   db.query(
//     `SELECT * FROM users WHERE teamleader_id = ? AND role = 'client'`,
//     [teamLeaderId],
//     (err, clients) => {
//       if (err) return res.status(500).json({ message: "DB error", error: err.message });

//       db.query(
//         `SELECT * FROM tasks WHERE assigned_to = ?`,
//         [teamLeaderId],
//         (err, tasks) => {
//           if (err) return res.status(500).json({ message: "DB error", error: err.message });

//           res.json({
//             dashboard: "Team Leader Dashboard",
//             clients,
//             tasks,
//           });
//         }
//       );
//     }
//   );
// });

// // BD Member Dashboard - only their own leads and tasks
// router.get("/bd", verifyToken(["bd"]), (req, res) => {
//   const bdId = req.user.id;

//   db.query(
//     `SELECT * FROM leads WHERE created_by = ?`,
//     [bdId],
//     (err, leads) => {
//       if (err) return res.status(500).json({ message: "DB error", error: err.message });

//       db.query(
//         `SELECT * FROM tasks WHERE assigned_to = ?`,
//         [bdId],
//         (err, tasks) => {
//           if (err) return res.status(500).json({ message: "DB error", error: err.message });

//           res.json({
//             dashboard: "BD Member Dashboard",
//             leads,
//             tasks,
//           });
//         }
//       );
//     }
//   );
// });

// // Client Dashboard - only their own info
// router.get("/client", verifyToken(["client"]), (req, res) => {
//   const clientId = req.user.id;

//   db.query(
//     `SELECT * FROM users WHERE id = ?`,
//     [clientId],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: "DB error", error: err.message });

//       res.json({
//         dashboard: "Client Dashboard",
//         profile: result[0],
//       });
//     }
//   );
// });

// module.exports = router;

// routes/taskRoutes.js
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const authenticateUser = require("../middleware/authMiddleware").authenticateUser;

// // GET tasks based on role
// router.get("/team", authenticateUser, (req, res) => {
//   const userId = req.user.id;
//   const role = req.user.role;

//   if (role === "admin") {
//     db.query("SELECT * FROM tasks", (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json(results);
//     });
//   } else if (role === "manager") {
//     db.query("SELECT * FROM tasks WHERE manager_id = ?", [userId], (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json(results);
//     });
//   } else if (role === "bd") {
//     db.query("SELECT * FROM tasks WHERE bd_id = ?", [userId], (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json(results);
//     });
//   } else if (role === "team") {
//     db.query("SELECT * FROM tasks WHERE assignee_id = ?", [userId], (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json(results);
//     });
//   } else {
//     res.status(403).json({ message: "Access denied" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticateUser } = require("../middleware/authMiddleware");

// GET tasks based on role (with if-else)
router.get("/", authenticateUser, (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  let sql;
  let params = [];

  if (role === "admin") {
    sql = "SELECT * FROM tasks";
  } else if (role === "manager") {
    sql = "SELECT * FROM tasks WHERE manager_id = ?";
    params = [userId];
  } else if (role === "bd") {
    sql = "SELECT * FROM tasks WHERE bd_id = ?";
    params = [userId];
  } else if (role === "team") {
    sql = "SELECT * FROM tasks WHERE assignee_id = ?";
    params = [userId];
  } else {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST add a new task
router.post("/", authenticateUser, (req, res) => {
  const { title, description, manager_id, bd_id, assignee_id, status, due_date } = req.body;
  const sql = "INSERT INTO tasks (title, description, manager_id, bd_id, assignee_id, status, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, description, manager_id, bd_id, assignee_id, status, due_date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// PUT update a task
router.put("/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const { title, description, manager_id, bd_id, assignee_id, status, due_date } = req.body;
  const sql = "UPDATE tasks SET title=?, description=?, manager_id=?, bd_id=?, assignee_id=?, status=?, due_date=? WHERE id=?";
  db.query(sql, [title, description, manager_id, bd_id, assignee_id, status, due_date, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// DELETE a task
router.delete("/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted", id });
  });
});

module.exports = router;
