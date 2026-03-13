import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Normal User Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const result = await pool.query(
      "SELECT id, email, password, role FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];

    if (user.role === "admin") return res.status(403).json({ message: "Admins cannot login here" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "2h" });

    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;