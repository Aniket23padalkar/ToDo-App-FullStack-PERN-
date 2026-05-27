export interface InsertUserData {
  username: string;
  email_id: string;
  password: string;
}

export interface User {
  user_id: number;
  username: string;
  email_id: string;
  password: string;
}

export type SafeUser = Omit<User, "password">;

export interface LoginResponse {
  token: string;
  user: SafeUser;
}
