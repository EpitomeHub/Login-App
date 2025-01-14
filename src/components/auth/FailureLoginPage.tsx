import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FailureLoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div style={{ textAlign: "center" }}>
        <h2 className="text-danger mb-4">Login Failed</h2>
        <p>Your login attempt was unsuccessful. Please check your credentials or register a new account.</p>
        <Button variant="primary" className="me-2" onClick={() => navigate("/")}>
          Try Again
        </Button>
        <Button variant="secondary" onClick={() => navigate("/register")}>
          Register New Account
        </Button>
      </div>
    </Container>
  );
};

export default FailureLoginPage;
