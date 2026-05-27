import {
  checkTodoExistsInDB,
  deleteTodoFromDB,
  getTodosFromDB,
  insertTodoInDB,
  updateTodoInDB,
} from "../repository/todoRepo.js";
import type {
  EditTodoType,
  InsertTodo,
  Todo,
  TodoExists,
} from "../types/todo.types.js";
import { AppError } from "../utils/AppError.js";

export const getTodosService = async (user_id: number): Promise<Todo[]> => {
  const todo = await getTodosFromDB(user_id);

  return todo;
};

export const insertTodoService = async ({
  title,
  user_id,
}: InsertTodo): Promise<Todo> => {
  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const newTodo = await insertTodoInDB({ title, user_id });

  return newTodo;
};

export const editTodoService = async ({
  todo_id,
  title,
  is_completed,
  user_id,
}: EditTodoType): Promise<EditTodoType> => {
  if (!todo_id) {
    throw new AppError("No todo_id provided", 400);
  }

  await checkTodoExistsInDB({ todo_id, user_id });

  const updatedTodo = await updateTodoInDB({
    todo_id,
    user_id,
    title,
    is_completed,
  });

  return updatedTodo;
};

export const deleteTodoService = async ({
  todo_id,
  user_id,
}: TodoExists): Promise<EditTodoType> => {
  console.log(todo_id);

  if (!todo_id) {
    throw new AppError("Please provide todo_id", 400);
  }

  await checkTodoExistsInDB({ todo_id, user_id });

  const deletedTodo = await deleteTodoFromDB({ todo_id, user_id });

  return deletedTodo;
};
