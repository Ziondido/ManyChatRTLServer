// utils/db.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Check if the database file exists, create it if not
const dbFile = path.join(__dirname, '..', 'users.db');
if (!fs.existsSync(dbFile)) {
  console.log('Database file not found, creating users.db...');
  fs.writeFileSync(dbFile, '');
}

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize tables
db.serialize(() => {
  // Create the 'users' table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      name TEXT,
      given_name TEXT,
      family_name TEXT,
      picture TEXT,
      locale TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      rtl_counter INTEGER DEFAULT 0,
      account_type TEXT DEFAULT 'free'
    )
  `);

  // Create the 'pages' table
  db.run(`
    CREATE TABLE IF NOT EXISTS pages (
      page_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT,
      page_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_email) REFERENCES users(email)
    )
  `);
});

module.exports = db;
