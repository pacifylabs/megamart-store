import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, refreshToken, signup } from "../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [refreshTk, setRefreshTk] = useState(localStorage.getItem("refreshToken") || null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedUser && storedAccessToken) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setAccessToken(storedAccessToken);
          setRefreshTk(storedRefreshToken);
          console.log("Auth initialized from localStorage:", userData);
        } catch (error) {
          console.error("Error parsing stored auth data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  // Signup
  const handleSignup = async (data) => {
    const res = await signup(data);
    return res.data;
  };

  // Login
  const handleLogin = async (credentials) => {
    try {
      const res = await loginService(credentials);
      const { accessToken, refreshToken, user } = res.data;

      // Update state
      setUser(user);
      setAccessToken(accessToken);
      setRefreshTk(refreshToken);

      // Update localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      
      console.log("Login successful - user set in context:", user);
      return res.data;
    } catch (error) {
      console.error("Login error in AuthContext:", error);
      throw error;
    }
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
    console.log("Logging out user");
    setUser(null);
    setAccessToken(null);
    setRefreshTk(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    accessToken,
    isInitialized,
    handleSignup,
    handleLogin,
    login: handleLogin, // Alias for compatibility
    handleLogout,
    handleRefresh
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};