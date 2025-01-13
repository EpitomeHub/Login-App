import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, { email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to connect to the server.";
      alert(errorMessage);
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
