// Uses Node.js built-in sqlite (available in Node 24+ without any flags).
// Zero native compilation required — no C++ toolchain needed.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'inventa.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS message_logs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    type         TEXT    NOT NULL,
    channel      TEXT    NOT NULL,
    sender_name  TEXT,
    sender_email TEXT,
    sender_phone TEXT,
    status       TEXT    NOT NULL,
    error_detail TEXT,
    created_at   DATETIME DEFAULT (datetime('now'))
  )
`);

const insertStmt = db.prepare(`
  INSERT INTO message_logs
    (type, channel, sender_name, sender_email, sender_phone, status, error_detail)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

/**
 * Log a message attempt to SQLite.
 * Never throws — logging must not break the request flow.
 */
function logMessage({ type, channel, senderName, senderEmail, senderPhone, status, errorDetail = null }) {
  try {
    insertStmt.run(
      type,
      channel,
      senderName || null,
      senderEmail || null,
      senderPhone || null,
      status,
      errorDetail
    );
  } catch (err) {
    console.error('[DB] Failed to write log:', err.message);
  }
}

module.exports = { logMessage };
