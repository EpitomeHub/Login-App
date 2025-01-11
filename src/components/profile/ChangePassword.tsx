import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { changePassword } from '../../services/api';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwords);
      alert('Password changed successfully.');
    } catch (error) {
      alert('Failed to change password.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h2 className="mb-4 text-start">Change Password</h2>
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                required
                style={{ maxWidth: '300px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
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

export default ChangePassword;
