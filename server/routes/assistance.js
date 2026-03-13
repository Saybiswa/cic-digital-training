import express from "express";
import pool from "../db.js";

const router = express.Router();

// 1️⃣ SAVE QUESTION
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO assistance (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.json({ message: "Question saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;