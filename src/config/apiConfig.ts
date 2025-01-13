const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
};

export default API_ENDPOINTS;
