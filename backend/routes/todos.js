import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.user_id],
    );
    res.status(200).json(todos.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const newTodo = await pool.query(
      "INSERT INTO todos(title, user_id) VALUES ($1, $2) RETURNING *",
      [title, req.user.user_id],
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    res.status(400).json({ message: "Please provide all required fields!" });
  }
});

router.patch("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { title, is_completed } = req.body;

  try {
    const updated = await pool.query(
      "UPDATE todos SET title = $1, is_completed = $2 WHERE todo_id = $3 AND user_id = $4 RETURNING *",
      [title, is_completed, id, req.user.user_id],
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.user_id],
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Todo not Found!" });
    }

    res.status(200).json({ message: "Todo successfully deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
