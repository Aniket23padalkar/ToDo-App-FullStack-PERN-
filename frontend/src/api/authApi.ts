import type {
  GetUserResponse,
  LoginData,
  LoginResponse,
  LogoutResponse,
  RegisterData,
} from "../types/auth.types";

const API = "http://localhost:3000/api/auth";

export async function getUser(): Promise<GetUserResponse> {
  try {
    const res = await fetch(`${API}/me`, {
      method: "GET",
      credentials: "include",
    });

    const result: GetUserResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(formData: LoginData): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const result: LoginResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    throw err;
  }
}

export async function registerUser(data: RegisterData): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result: LoginResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function logoutUser(): Promise<LogoutResponse> {
  try {
    const res = await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const result: LogoutResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    throw err;
  }
}
