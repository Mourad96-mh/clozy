import { createContext, useContext, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);
const TOKEN_KEY = "boutique-token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)
  );

  const login = async (email, password) => {
    const { token } = await api.login({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
