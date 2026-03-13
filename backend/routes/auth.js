import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, //30days
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post("/register", async (req, res) => {
  const { username, email_id, password } = req.body;

  if (!username || !email_id || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }

  const userExists = await pool.query(
    "SELECT * FROM users WHERE email_id = $1",
    [email_id],
  );

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users(username, email_id, password) VALUES ($1, $2, $3) RETURNING user_id, username, email_id",
    [username, email_id, hashedPassword],
  );

  return res.status(201).json({ message: "User registered successfully!" });
});

router.post("/login", async (req, res) => {
  const { email_id, password } = req.body;

  if (!email_id || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields!" });
  }

  const user = await pool.query("SELECT * FROM users WHERE email_id=$1", [
    email_id,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid Credentials!" });
  }

  const userData = user.rows[0];

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const token = generateToken(userData.user_id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      user_id: userData.user_id,
      username: userData.username,
      email_id: userData.email_id,
    },
  });
});

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged Out Successfully!" });
});

export default router;
