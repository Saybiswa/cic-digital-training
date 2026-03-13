import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Admin login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: "User not found" });

    const user = result.rows[0];

    if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "2h" });

    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create user (admin only)
router.post("/create-user", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email.toLowerCase(), hashedPassword, role || "user"]
    );

    res.json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;