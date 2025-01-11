import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { register } from '../../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
    
      const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await register(formData);
          alert('Registration Successful');
        } catch (error) {
          alert('Registration Failed. Try Again.');
        }
      };
    
      return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
          <Row className="w-100">
            <Col xs={12} md={6} lg={4} className="mx-auto">
              <h2 className="mb-4 text-start">Register</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ maxWidth: '300px' }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ maxWidth: '300px' }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ maxWidth: '300px' }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: '300px' }}>
                  <Button variant="primary" type="submit">Register</Button>
                  <a href="/login" className="text-decoration-none">Back to Login</a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    };

export default Register;