import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, refreshToken, signup } from "../services/authServices";
import { userService } from "../services/api/userService";

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
        } catch (error) {
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
      
      
      return res.data;
    } catch (error) {
      
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
    
    setUser(null);
    setAccessToken(null);
    setRefreshTk(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  // Update user information
  const updateUser = async (userData) => {
    try {
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Whitelist only mutable profile fields expected by the backend
      const allowedUpdateData = {
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        phone: userData.phone ?? null,
        dateOfBirth: userData.dateOfBirth ?? null,
        gender: userData.gender ?? null,
        address: userData.address ?? null,
        city: userData.city ?? null,
        country: userData.country ?? null,
        postalCode: userData.postalCode ?? null,
        profileImageUrl: userData.profileImageUrl ?? null,
      };

      const response = await userService.updateProfile(allowedUpdateData);
      const updatedUser = response.data;
      
      if (!updatedUser) {
        throw new Error('Failed to update user: No data returned from server');
      }

      // Update state
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    accessToken,
    isInitialized,
    handleSignup,
    handleLogin,
    updateUser, // Add the updateUser function
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