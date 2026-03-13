// server.js
import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import assistanceRoutes from "./routes/assistance.js";
import assessmentsRoutes from "./routes/assessments.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/assistance", assistanceRoutes);
app.use("/api/assessments", assessmentsRoutes);
app.use("/api/auth", authRoutes);       // normal users
app.use("/api/admin", adminRoutes);     // admins
app.use("/api", passwordRoutes);

// Test DB connection
pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB Connected:", res.rows[0]))
  .catch(err => console.error("❌ DB Error:", err));

// ----------------------------
// User login (normal users only)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email.toLowerCase()]);
    if (!result.rows.length) return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];

    // Block admin login here
    if (user.role === "admin") return res.status(403).json({ message: "Admins cannot login here" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "SECRET_KEY", { expiresIn: "2h" });

    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// Admin login (admins only)
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email.toLowerCase()]);
    if (!result.rows.length) return res.status(401).json({ message: "User not found" });

    const user = result.rows[0];

    // Only allow admin role
    if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "SECRET_KEY", { expiresIn: "2h" });

    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// Forgot Password
// ----------------------------
// Direct Password Reset (Forgot Password)

app.post("/api/forgot-password", async (req, res) => {
  const { email, dob, empId, password } = req.body;

  try {

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND dob=$2 AND emp_id=$3",
      [email.toLowerCase(), dob, empId]
    );

    if (!result.rows.length) {
      return res.status(400).json({ message: "Invalid user details" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1 WHERE email=$2",
      [hashedPassword, email.toLowerCase()]
    );

    res.json({ message: "Password reset successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
app.listen(5000, () => console.log("Server running on port 5000"));