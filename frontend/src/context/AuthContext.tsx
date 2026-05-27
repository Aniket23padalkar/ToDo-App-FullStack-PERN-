import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUser } from "../api/authApi.js";
import type { AuthContextType, UserData } from "../types/auth.types.js";

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const result = await getUser();

      console.log(result.user);

      setUser(result.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
