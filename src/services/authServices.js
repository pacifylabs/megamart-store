import axios from "axios";
import { API_URL } from "../utils/api-axios";

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response
};

// Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    
    if (response) {
      // Return the data in the expected format
      return {
        data: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.data.user
        }
      };
    }
    
    throw new Error("Invalid response format from server");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Refresh token
export const refreshToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: token });
    
    if (response.data && response.data.tokens) {
      return {
        data: {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
          user: response.data.user
        }
      };
    }
    
    throw new Error("Invalid refresh token response format");
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};
