import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getApplications, manageApplication } from '../../services/api';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await getApplications();
      setApplications(response.data);
    };
    fetchApplications();
  }, []);

  const handleAction = async (id: number, action: 'approve' | 'deny') => {
    try {
      await manageApplication(id, action);
      alert(`Application ${action}ed successfully.`);
      setApplications((prev) => prev.filter((app: any) => app.id !== id));
    } catch (error) {
      alert('Action failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Applications</h2>
      <div className="row">
        {applications.map((app: any) => (
          <div className="col-md-4" key={app.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>Status: {app.status}</Card.Text>
                <Button variant="success" onClick={() => handleAction(app.id, 'approve')} className="me-2">Approve</Button>
                <Button variant="danger" onClick={() => handleAction(app.id, 'deny')}>Deny</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplications;