import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "./db.ts";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Seed initial admin if no users exist
  const adminExists = db.prepare("SELECT * FROM users WHERE email = ?").get("admin@hostel.com");
  if (!adminExists) {
    const adminPassword = "admin123";
    const hashedAdminPassword = bcrypt.hashSync(adminPassword, 10);
    db.prepare("INSERT INTO users (name, email, password, role, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?)").run(
      "System Admin",
      "admin@hostel.com",
      hashedAdminPassword,
      "admin",
      "What is your favorite color?",
      "blue"
    );
    console.log("Seeded initial admin account: admin@hostel.com / admin123");
  }

  app.use(cors());
  app.use(express.json());

  // --- Auth Middleware ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  };

  const authorizeRole = (roles: string[]) => {
    return (req: any, res: any, next: any) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Unauthorized role" });
      }
      next();
    };
  };

  // --- API Routes ---

  // Auth
  app.post("/api/auth/register", (req, res) => {
    const { name, roll_no, email, password, role, security_question, security_answer } = req.body;
    try {
      if (!email || !password || !name || !security_question || !security_answer) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const stmt = db.prepare("INSERT INTO users (name, roll_no, email, password, role, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?, ?)");
      const result = stmt.run(name, roll_no || null, email, hashedPassword, role || 'student', security_question, security_answer);
      res.json({ id: result.lastInsertRowid });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    try {
      const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/forgot-password", (req, res) => {
    const { email } = req.body;
    try {
      const user: any = db.prepare("SELECT security_question FROM users WHERE email = ?").get(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ security_question: user.security_question });
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/reset-password", (req, res) => {
    const { email, security_answer, new_password } = req.body;
    try {
      const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (user.security_answer !== security_answer) {
        return res.status(401).json({ error: "Incorrect security answer" });
      }
      const hashedPassword = bcrypt.hashSync(new_password, 10);
      db.prepare("UPDATE users SET password = ? WHERE email = ?").run(hashedPassword, email);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Complaints
  app.post("/api/complaints", authenticateToken, (req: any, res) => {
    const { category, description, priority, image_url } = req.body;
    const stmt = db.prepare("INSERT INTO complaints (user_id, category, description, priority, image_url) VALUES (?, ?, ?, ?, ?)");
    const result = stmt.run(req.user.id, category, description, priority, image_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/complaints", authenticateToken, (req: any, res) => {
    let complaints;
    if (req.user.role === 'admin') {
      complaints = db.prepare(`
        SELECT c.*, u.name as student_name, a.staff_id, s.name as staff_name 
        FROM complaints c 
        JOIN users u ON c.user_id = u.id 
        LEFT JOIN assignments a ON c.id = a.complaint_id 
        LEFT JOIN users s ON a.staff_id = s.id
        ORDER BY c.created_at DESC
      `).all();
    } else if (req.user.role === 'staff') {
      complaints = db.prepare(`
        SELECT c.*, u.name as student_name 
        FROM complaints c 
        JOIN users u ON c.user_id = u.id 
        JOIN assignments a ON c.id = a.complaint_id 
        WHERE a.staff_id = ?
        ORDER BY c.created_at DESC
      `).all(req.user.id);
    } else {
      complaints = db.prepare("SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
    }
    res.json(complaints);
  });

  app.patch("/api/complaints/:id/status", authenticateToken, (req: any, res) => {
    const { status, notes } = req.body;
    const { id } = req.params;

    db.transaction(() => {
      db.prepare("UPDATE complaints SET status = ? WHERE id = ?").run(status, id);
      db.prepare("INSERT INTO updates (complaint_id, status, notes) VALUES (?, ?, ?)").run(id, status, notes);
    })();

    res.json({ success: true });
  });

  app.post("/api/complaints/:id/assign", authenticateToken, authorizeRole(['admin']), (req, res) => {
    const { staff_id } = req.body;
    const { id } = req.params;

    try {
      db.transaction(() => {
        const existing = db.prepare("SELECT * FROM assignments WHERE complaint_id = ?").get(id);
        if (existing) {
          db.prepare("UPDATE assignments SET staff_id = ? WHERE complaint_id = ?").run(staff_id, id);
        } else {
          db.prepare("INSERT INTO assignments (complaint_id, staff_id) VALUES (?, ?)").run(id, staff_id);
        }
        
        // Automatically move to in-progress if it was pending
        db.prepare("UPDATE complaints SET status = 'in-progress' WHERE id = ? AND status = 'pending'").run(id);
      })();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Users Management
  app.get("/api/users", authenticateToken, authorizeRole(['admin']), (req, res) => {
    const users = db.prepare("SELECT id, name, email, role, roll_no FROM users").all();
    res.json(users);
  });

  app.get("/api/users/staff", authenticateToken, (req, res) => {
    const staff = db.prepare("SELECT id, name, email FROM users WHERE role = 'staff'").all();
    res.json(staff);
  });

  // Analytics
  app.get("/api/analytics", authenticateToken, authorizeRole(['admin']), (req, res) => {
    const total = db.prepare("SELECT COUNT(*) as count FROM complaints").get() as any;
    const pending = db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'pending'").get() as any;
    const inProgress = db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'in-progress'").get() as any;
    const resolved = db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'resolved'").get() as any;
    
    const categoryWise = db.prepare("SELECT category, COUNT(*) as count FROM complaints GROUP BY category").all();

    res.json({
      summary: {
        total: total.count,
        pending: pending.count,
        inProgress: inProgress.count,
        resolved: resolved.count
      },
      categoryWise
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
