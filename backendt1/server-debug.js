// // This script will help debug your database connection
// require("dotenv").config()

// console.log("Checking environment variables:")
// console.log("DB_HOST:", process.env.DB_HOST ? "✓ Set" : "✗ Missing")
// console.log("DB_USER:", process.env.DB_USER ? "✓ Set" : "✗ Missing")
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✓ Set" : "✗ Missing")
// console.log("DB_NAME:", process.env.DB_NAME ? "✓ Set" : "✗ Missing")
// console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Set" : "✗ Missing")

// const mysql = require("mysql")

// try {
//   const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   })

//   db.connect((err) => {
//     if (err) {
//       console.error("Database connection error:", err)
//       console.log("\nPossible solutions:")
//       console.log("1. Check if your MySQL server is running")
//       console.log("2. Verify your database credentials in .env file")
//       console.log("3. Make sure the database exists")
//     } else {
//       console.log("MySQL connected successfully!")

//       // Check if users table exists
//       db.query('SHOW TABLES LIKE "users"', (err, results) => {
//         if (err) {
//           console.error("Error checking tables:", err)
//         } else if (results.length === 0) {
//           console.log("Users table does not exist. Creating it...")

//           // Create users table
//           const createTableSQL = `
//             CREATE TABLE users (
//               id INT AUTO_INCREMENT PRIMARY KEY,
//               name VARCHAR(255) NOT NULL,
//               email VARCHAR(255) NOT NULL UNIQUE,
//               password VARCHAR(255) NOT NULL,
//               role VARCHAR(50) NOT NULL,
//               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )
//           `

//           db.query(createTableSQL, (err) => {
//             if (err) {
//               console.error("Error creating users table:", err)
//             } else {
//               console.log("Users table created successfully!")
//             }
//             db.end()
//           })
//         } else {
//           console.log("Users table exists!")
//           db.end()
//         }
//       })
//     }
//   })
// } catch (error) {
//   console.error("Error initializing database connection:", error)
// }
