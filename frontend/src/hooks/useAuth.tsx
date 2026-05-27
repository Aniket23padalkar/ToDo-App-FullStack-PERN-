import { useContext } from "react";
import type { AuthContextType } from "../types/auth.types";
import { AuthContext } from "../context/AuthContext";

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be use inside AuthProvider");
  }

  return context;
}
