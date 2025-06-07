// const express = require("express")
// const router = express.Router()
// const db = require("../config/db")
// const verifyToken = require("../middleware/auth")

// // Get all leads (for BD users)
// router.get("/leads", verifyToken(["bd", "admin"]), (req, res) => {
//   // In a real implementation, you would fetch leads from the database
//   // For now, we'll return mock data
//   const mockLeads = [
//     { id: 1, name: "Acme Corp", status: "New Lead", value: "$15,000" },
//     { id: 2, name: "TechStart Inc", status: "In Progress", value: "$25,000" },
//     { id: 3, name: "Global Solutions", status: "Converted", value: "$50,000" },
//   ]

//   res.json(mockLeads)
// })

// // Add new lead
// router.post("/leads/add", verifyToken(["bd", "admin"]), (req, res) => {
//   const { name, status, value } = req.body

//   if (!name || !status) {
//     return res.status(400).json({ message: "Name and status are required" })
//   }

//   // In a real implementation, you would insert the lead into the database
//   // For now, we'll just return a success message
//   res.json({ message: "Lead added successfully", id: Math.floor(Math.random() * 1000) })
// })

// module.exports = router
