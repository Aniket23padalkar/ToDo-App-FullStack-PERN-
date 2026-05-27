export interface LoginData {
  email_id: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email_id: string;
  password: string;
}

export interface UserData {
  id: number;
  email_id: string;
  username: string;
}

export interface AuthContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
}

export interface LoginResponse {
  message: string;
  user: UserData;
}

export interface GetUserResponse {
  user: UserData;
  message: string;
}

export interface LogoutResponse {
  message: string;
}
