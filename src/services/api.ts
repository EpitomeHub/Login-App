import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.your-backend.com', // Replace with your backend URL
});

// Add Token to Requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const login = (data: { email: string; password: string }) => API.post('/auth/login', data);
export const register = (data: { name: string; email: string; password: string }) => API.post('/auth/register', data);
export const resetPassword = (email: string) => API.post('/auth/reset-password', { email });

// User Profile APIs
export const getProfile = () => API.get('/profile');
export const updateProfile = (data: { name: string; email: string }) => API.put('/profile', data);
export const changePassword = (data: { currentPassword: string; newPassword: string }) => API.put('/profile/change-password', data);

// Admin APIs
export const getUsers = () => API.get('/admin/users');
export const manageUser = (id: number, action: 'enable' | 'disable' | 'delete') => API.post(`/admin/users/${id}/${action}`);
export const getApplications = () => API.get('/admin/applications');
export const manageApplication = (id: number, action: 'approve' | 'deny') => API.post(`/admin/applications/${id}/${action}`);
