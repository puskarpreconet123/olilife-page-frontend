import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signup = async (email, password) => {
    const res = await api.post("/api/auth/signup", { email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await api.get("/api/auth/me");
    setUser(res.data.user);
    return res.data.user;
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: Boolean(user), loading, signup, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
