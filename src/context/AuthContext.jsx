import { createContext, useState, useEffect } from "react";
import { login, signup, refreshToken } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [refreshTk, setRefreshTk] = useState(localStorage.getItem("refreshToken") || null);

  // Signup
  const handleSignup = async (data) => {
    const res = await signup(data);
    return res.data;
  };

  // Login
  const handleLogin = async (credentials) => {
    const res = await login(credentials);
    const { accessToken, refreshToken, user } = res.data;

    setUser(user);
    setAccessToken(accessToken);
    setRefreshTk(refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Refresh access token
  const handleRefresh = async () => {
    if (!refreshTk) return;

    try {
      const res = await refreshToken(refreshTk);
      const { accessToken } = res.data;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
    } catch (err) {
      handleLogout();
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshTk(null);
    localStorage.clear();
  };

  // Auto restore user from storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, handleSignup, handleLogin, handleLogout, handleRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};
