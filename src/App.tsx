import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import FailureLoginPage from "./components/auth/FailureLoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path ="/failure-login" element={<FailureLoginPage/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;