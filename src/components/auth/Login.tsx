import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login Successful');
      // Redirect to Dashboard
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h2 className="mb-4 text-start">Sign In</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ maxWidth: '300px' }}
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
                style={{ maxWidth: '300px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: '300px' }}>
              <Button variant="primary" type="submit">Submit</Button>
              <a href="/reset-password" className="text-decoration-none">Forgot password?</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
