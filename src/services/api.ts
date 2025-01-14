import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://pm-api.deval.us/api", // Base URL for API calls
  timeout: 10000, // Timeout for requests (optional)
});

// Request Interceptor: Attach Authorization Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Reject request if an error occurs
  }
);

// Response Interceptor: Handle Global Errors
api.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  (error) => {
    if (error.response?.status === 401) {
      // Handle Unauthorized Error (Token Expired or Invalid)
      localStorage.removeItem("token"); // Clear token from storage
      window.location.href = "/"; // Redirect user to login page
      alert("Session expired. Please log in again.");
    }
    if (error.response?.status === 403) {
      // Handle Forbidden Error
      alert("You do not have permission to perform this action.");
    }
    if (error.response?.status >= 500) {
      // Handle Server Errors
      alert("Server error. Please try again later.");
    }
    return Promise.reject(error); // Reject other errors
  }
);

// Export common API methods for reuse
export const login = (email: string, password: string) =>
  api.post("/login", { email, password });

export const fetchUserData = (email: string) =>
  api.get(`/user/${email}`);

export const resetPassword = (email: string) =>
  api.post(`/user/pwd/${email}`);

export const updateUserPassword = (email: string, newPassword: string) =>
  api.put(`/user/pwd/${email}`, { password: newPassword });


export default api;
