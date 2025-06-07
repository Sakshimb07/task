const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./config/db")
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")
// const adminRoutes = require("./routes/admin") // Add this line
const alertRoutes = require("./routes/alert") // Add this line
// const bdRoutes = require("./routes/bd") // Add this line
const calendarRoutes = require("./routes/calendar") // Add this line
const dashboardRoutes = require("./routes/dashboard") // Add this line
const noticeRoutes = require("./routes/notice") // Add this line

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())



app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
// app.use("/api/admin", adminRoutes) // Add this line
app.use("/api/alert", alertRoutes) // Add this line
// app.use("/api/bd", bdRoutes) // Add this line
app.use("/api/calendar", calendarRoutes) // Add this line
app.use("/api/dashboard", dashboardRoutes) // Add this line
app.use("/api/notice", noticeRoutes) // Add this line

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
