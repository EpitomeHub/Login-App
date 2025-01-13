import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";


const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      alert(response.data.message || "Password reset link sent to your email");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to connect to the server.";
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
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ResetPassword;
