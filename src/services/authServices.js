import axios from "axios";
import { API_URL } from "../utils/api-axios";

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  console.log("RES::", response)
  return response
};

// Login
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/signin`, credentials);
  console.log("RES::", response)
  localStorage.setItem("accessToken", response.data.tokens.accessToken);
  localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response;
};

// Refresh token
export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
  console.log("RES::", response)
  return
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};
