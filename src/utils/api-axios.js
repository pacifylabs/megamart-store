// src/api.js
import axios from "axios";
// export const API_URL = "http://localhost:5050"; 
export const API_URL = "https://megamart-backend-oc0q.onrender.com"; 
const API = axios.create({
  baseURL: `${API_URL}`,
});
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          `${API_URL}/auth/refresh-token`,
          { refreshToken }
        );
        localStorage.setItem("accessToken", data.accessToken);
        API.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export default API;
export const CURRENCY_SIGN = "₹";