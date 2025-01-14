import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api", // Use environment variable or default base URL
});

// Attach token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Login API call
export const login = (data: { email: string; password: string }) =>
  api.post("/login", data);

// Register API call
export const register = (data: { firstName: string; lastName: string; email: string; password: string }) =>
  api.post("/register", data);

// Reset Password API call
export const resetPassword = (data: { token: string; newPassword: string }) =>
  api.post("/reset-password", data);

// Fetch user details
export const fetchUserDetails = () => api.get("/user");

// Update user details
export const updateUserDetails = (data: { firstName: string; lastName: string; email: string }) =>
  api.put("/user", data);

// Update user password
export const updateUserPassword = (data: { currentPassword: string; newPassword: string }) =>
  api.put("/user/update-password", data);

export default api;
