import pool from "../config/db.js";
import type { InsertUserData, SafeUser, User } from "../types/auth.types.js";

export const getUserByEmail = async (
  email_id: string,
): Promise<User | undefined> => {
  const query = `SELECT user_id, username, email_id, password FROM users WHERE email_id = $1`;

  const result = await pool.query<User>(query, [email_id]);

  return result.rows[0];
};

export const insertUserIntoDB = async ({
  username,
  email_id,
  password,
}: InsertUserData): Promise<SafeUser> => {
  const query = `
        INSERT INTO users
            (username, email_id, password)
        VALUES
            ($1, $2, $3)
        RETURNING
            user_id,
            username,
            email_id
    `;

  const result = await pool.query<SafeUser>(query, [
    username,
    email_id,
    password,
  ]);

  if (!result.rows[0]) {
    throw new Error("Database insert failed");
  }

  return result.rows[0];
};
