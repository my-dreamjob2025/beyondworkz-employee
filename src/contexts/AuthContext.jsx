import { createContext, useState, useEffect, useCallback } from "react";
import api, { setAccessToken, clearAccessToken } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking session on mount

  // Attempt silent token refresh on app load (uses HttpOnly refresh cookie)
  const initAuth = useCallback(async () => {
    try {
      const { data } = await api.post("/auth/refresh", { panel: "employee" });
      if (data.success && data.accessToken) {
        setAccessToken(data.accessToken);
        setUser(data.user);
      }
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = (accessToken, userData) => {
    setAccessToken(accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", { panel: "employee" });
    } catch {
      // proceed even if server call fails
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
