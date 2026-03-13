import express from "express";
import pool from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// SAVE ASSESSMENT (USER)
// ===============================
router.post("/", verifyToken, async (req, res) => {
  try {

    const { day, topic, score, duration_seconds } = req.body;

    const username = req.user.email || "unknown";

    const result = await pool.query(
      `INSERT INTO assessments 
      (username, day, topic, score, duration_seconds)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [username, day, topic, score, duration_seconds]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("❌ Failed to save assessment:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// ADMIN: GET ALL ASSESSMENTS
// ===============================
router.get("/", verifyToken, async (req, res) => {

  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const result = await pool.query(
      "SELECT * FROM assessments ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error("❌ Failed to fetch assessments:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// ADMIN DELETE (optional)
// ===============================
router.delete("/", verifyToken, async (req, res) => {

  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    await pool.query("DELETE FROM assessments");

    res.json({ success: true });

  } catch (err) {
    console.error("❌ Failed to delete assessments:", err);
    res.status(500).json({ error: err.message });
  }

});

export default router;