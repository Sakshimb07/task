const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log('DB Credentials:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  hasPassword: !!process.env.DB_PASS
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // Updated to match DB_PASS
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  connectTimeout: 30000,
  ssl: {
    rejectUnauthorized: true
  }
});

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
