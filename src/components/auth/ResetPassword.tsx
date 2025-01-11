import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { resetPassword } from '../../services/api';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert('Password reset link sent to your email.');
    } catch (error) {
      alert('Error sending reset link. Try Again.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h2 className="mb-4 text-start">Forgot Password</h2>
          <Form onSubmit={handleReset}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ maxWidth: '300px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: '300px' }}>
              <Button variant="primary" type="submit">Send Link</Button>
              <a href="/login" className="text-decoration-none">Back to Login</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;