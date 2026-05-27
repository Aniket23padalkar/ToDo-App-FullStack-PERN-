import type { NextFunction, Request, Response } from "express";
import {
  deleteTodoService,
  editTodoService,
  getTodosService,
  insertTodoService,
} from "../services/todoService.js";
import type { EditTodoData, InsertTodoData } from "../schemas/todo.schema.js";

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getTodosService(req.user?.user_id);

    res
      .status(200)
      .json({ todos: result, message: "Todos Successfully fetched" });
  } catch (err) {
    next(err);
  }
};

export const insertTodo = async (
  req: Request<{}, {}, InsertTodoData>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await insertTodoService({
      title: req.body.title,
      user_id: req.user.user_id,
    });

    res
      .status(201)
      .json({ todo: result, message: "Todo created successfully" });
  } catch (err) {
    next(err);
  }
};

export const editTodo = async (
  req: Request<{ id: string }, {}, EditTodoData>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todoId = Number(req.params.id);

    const result = await editTodoService({
      todo_id: todoId,
      title: req.body.title,
      is_completed: req.body.is_completed,
      user_id: req.user.user_id,
    });

    res
      .status(200)
      .json({ todo: result, message: "Todo Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: Request<{ todo_id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todoId = Number(req.params.todo_id);
    const result = await deleteTodoService({
      todo_id: todoId,
      user_id: req.user.user_id,
    });

    res
      .status(200)
      .json({ todo: result, message: "Todo deleted successfully" });
  } catch (err) {
    next(err);
  }
};
