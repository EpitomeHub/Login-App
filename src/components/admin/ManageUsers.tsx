import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getUsers, manageUser } from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAction = async (id: number, action: 'enable' | 'disable' | 'delete') => {
    try {
      await manageUser(id, action);
      alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action completed.`);
      setUsers((prev) => prev.filter((user: any) => user.id !== id));
    } catch (error) {
      alert('Action failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <Button variant="warning" onClick={() => handleAction(user.id, 'disable')}>Disable</Button>{' '}
                <Button variant="danger" onClick={() => handleAction(user.id, 'delete')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;