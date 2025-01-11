import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getProfile, updateProfile } from '../../services/api';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        alert('Failed to fetch profile data.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert('Profile updated successfully.');
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light" style={{ paddingTop: '5vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h2 className="mb-4 text-start">Edit Profile</h2>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
                style={{ maxWidth: '300px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
                style={{ maxWidth: '300px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: '300px' }}>
              <Button variant="primary" type="submit">Update</Button>
              <a href="/profile" className="text-decoration-none">Back to Profile</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;