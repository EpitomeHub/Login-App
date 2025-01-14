const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/reset-password`,
  FETCH_USER: (email: string) => `${API_BASE_URL}/user/${email}`,
  EDIT_USER: (userId: string) => `${API_BASE_URL}/user/${userId}`,
  // FETCH_USER: (email: string) => `/user/${email}`,
  //   EDIT_USER: (userId: string) => `/user/${userId}`,
};

export default API_ENDPOINTS;
