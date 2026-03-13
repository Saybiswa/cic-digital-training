import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = express.Router();

/* FORGOT PASSWORD → DIRECT RESET */

router.post("/forgot-password", async (req, res) => {
  const { email, dob, empId, password } = req.body;

  try {

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND dob=$2 AND emp_id=$3",
      [email, dob, empId]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid user details" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1 WHERE email=$2",
      [hashedPassword, email]
    );

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;