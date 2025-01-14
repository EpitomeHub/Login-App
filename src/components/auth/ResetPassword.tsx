import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/user/pwd/${email}`);
      alert("Password reset link sent to your email.");
      navigate("/"); // Redirect to login after success
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <Form onSubmit={handleResetPassword}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ResetPassword;
