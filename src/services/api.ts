import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api", // Use environment variable or default base URL
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

export default api;
