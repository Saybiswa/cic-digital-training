import bcrypt from "bcrypt";
import pool from "./db.js";

const createUser = async (email, password, dob, empId, role) => {
  try {
    const lowerEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (email, password, dob, emp_id, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      [lowerEmail, hashedPassword, dob, empId, role]
    );

    console.log(`✅ User ${lowerEmail} created successfully!`);
  } catch (err) {
    console.error(`❌ Error creating user ${email}:`, err.message);
  }
};

const run = async () => {

  await createUser(
    "lgai4908@lgindiabot.com",
    "Sayani@98",
    "1998-12-27",
    "SSLG4908",
    "user"
  );

  await createUser(
    "sayani@lgindiabot.com",
    "Sayani123@98",
    "1997-08-21",
    "EMP002",
    "user"
  );

  await createUser(
    "user2@lgindiabot.com",
    "UserPassword123",
    "1995-03-15",
    "EMP003",
    "user"
  );

  await createUser(
    "admin1@lgindiabot.com",
    "AdminPassword123",
    "1990-01-01",
    "ADM001",
    "admin"
  );

  await pool.end();
};

run();