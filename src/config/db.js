// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: Test connection once when app starts
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database.");
    connection.release(); // return connection to pool
  } catch (err) {
    console.error("❌ Failed to connect to MySQL:", err.message);
  }
}

testConnection();

module.exports = db;
