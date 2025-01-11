import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
 import Register from './components/auth/Register';
 import ResetPassword from './components/auth/ResetPassword';
 import ProfileEdit from './components/profile/ProfileEdit';
import ChangePassword from './components/profile/ChangePassword';
import ManageUsers from './components/admin/ManageUsers';
import ManageApplications from './components/admin/ManageApplications';
import ErrorPage from './components/common/ErrorPage';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profileEdit" element={<ProfileEdit />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/manage-applications" element={<ManageApplications />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default App;