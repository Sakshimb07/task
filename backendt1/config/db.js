const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Use createConnection (or createPool for multiple connections)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect and handle errors
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL2 connection error:", err);
    throw err;
  }
  console.log("✅ MySQL2 connected...");
});

module.exports = db;
