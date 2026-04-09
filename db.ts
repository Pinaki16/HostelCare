import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'hostel_complaints.db');
const db = new Database(dbPath);
console.log(`Database initialized at ${dbPath}`);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll_no TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'admin', 'staff')) NOT NULL,
    security_question TEXT,
    security_answer TEXT
  );

  -- Add columns if they don't exist (for existing databases)
  -- SQLite doesn't have IF NOT EXISTS for ADD COLUMN, so we use a try-catch pattern in the app logic or just assume fresh for now.
  -- But to be safe, we can try to add them.
`);

try {
  db.exec(`ALTER TABLE users ADD COLUMN security_question TEXT;`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE users ADD COLUMN security_answer TEXT;`);
} catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'in-progress', 'resolved')),
    priority TEXT CHECK(priority IN ('low', 'medium', 'high')),
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    complaint_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints (id),
    FOREIGN KEY (staff_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    complaint_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints (id)
  );
`);

export default db;
