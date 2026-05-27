import pool from "../config/db.js";
import type {
  EditTodoType,
  InsertTodo,
  Todo,
  TodoExists,
} from "../types/todo.types.js";
import { AppError } from "../utils/AppError.js";

export const getTodosFromDB = async (user_id: number): Promise<Todo[]> => {
  const query = `
        SELECT
            todo_id,
            title,
            is_completed,
            created_at
        FROM todos
        WHERE user_id = $1
    `;

  const result = await pool.query<Todo>(query, [user_id]);

  return result.rows;
};

export const insertTodoInDB = async ({
  title,
  user_id,
}: InsertTodo): Promise<Todo> => {
  const query = `
    INSERT INTO todos
        (title, user_id)
    VALUES
        ($1, $2)
    RETURNING
        todo_id,
        title,
        is_completed,
        created_at
  `;

  const result = await pool.query<Todo>(query, [title, user_id]);

  if (!result.rows[0]) {
    throw new AppError("Something went wrong inserting TODO", 500);
  }

  return result.rows[0];
};

export const checkTodoExistsInDB = async ({
  todo_id,
  user_id,
}: TodoExists): Promise<boolean> => {
  const query = `
        SELECT EXISTS (
            SELECT 1 FROM todos
            WHERE 
                todo_id = $1 
                AND user_id = $2
        ) AS exists
    `;

  const result = await pool.query<{ exists: boolean }>(query, [
    todo_id,
    user_id,
  ]);

  if (!result.rows[0]?.exists) {
    throw new AppError("Todo not found", 404);
  }

  return result.rows[0]?.exists;
};

export const updateTodoInDB = async ({
  todo_id,
  user_id,
  title,
  is_completed,
}: EditTodoType): Promise<EditTodoType> => {
  const query = `
        UPDATE todos 
        SET title = $1,is_completed= $2
        WHERE user_id = $3
            AND todo_id = $4
        RETURNING
            todo_id,
            title,
            is_completed,
            created_at
    `;

  const result = await pool.query<EditTodoType>(query, [
    title,
    is_completed,
    user_id,
    todo_id,
  ]);

  if (!result.rows[0]) {
    throw new AppError("Error while editing TODO", 400);
  }

  return result.rows[0];
};

export const deleteTodoFromDB = async ({
  todo_id,
  user_id,
}: TodoExists): Promise<EditTodoType> => {
  const query = `
        DELETE FROM todos
            WHERE todo_id = $1 AND user_id = $2
        RETURNING
            todo_id,
            title,
            is_completed,
            created_at
    `;

  const result = await pool.query<EditTodoType>(query, [todo_id, user_id]);

  if (!result.rows[0]) {
    throw new AppError("Error while deleting the todo", 500);
  }

  return result.rows[0];
};
