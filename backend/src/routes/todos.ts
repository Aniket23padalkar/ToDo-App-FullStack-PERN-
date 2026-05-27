import express from "express";
import { protect } from "../middleware/protect.js";
import {
  deleteTodo,
  editTodo,
  getTodos,
  insertTodo,
} from "../controllers/todoController.js";
import { validate } from "../middleware/validate.js";
import { editTodoSchema, insertTodoSchema } from "../schemas/todo.schema.js";

const router = express.Router();

router.get("/", protect, getTodos);

router.post("/", protect, validate(insertTodoSchema), insertTodo);

router.patch("/:id", protect, validate(editTodoSchema), editTodo);

router.delete("/:todo_id", protect, deleteTodo);

export default router;
