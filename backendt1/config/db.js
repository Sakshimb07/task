const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

let sslConfig;
try {
  sslConfig = {
    ca: fs.readFileSync('./cert'), // Updated to match the actual file name
    rejectUnauthorized: true // Enforce certificate validation
  };
} catch (err) {
  console.error('❌ Failed to load SSL certificate:', err.message);
  throw err;
}

// Use createConnection with SSL configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000, // TiDB Cloud default port
  connectTimeout: 30000, // 30 seconds
  ssl: sslConfig
});

// Connect and handle errors
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL2 connection error:', {
      error: err.message,
      code: err.code,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 4000
    });
    throw err;
  }
  console.log('✅ MySQL2 connected...');
});

module.exports = db;
