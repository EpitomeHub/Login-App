import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import  API_ENDPOINTS  from "../config/apiConfig";

interface User {
  userId: string;
  username: string;
  userType: string;
  userStatus: string;
  userCreated: string;
  userLastLogin: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = "test@gmail.com"; // Replace with the logged-in user's email
      try {
        const response = await axios.get(API_ENDPOINTS.FETCH_USER(email), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token
          },
        });
        const userData = response.data;
        const formattedUser = {
          userId: userData.id,
          username: userData.name,
          userType: userData.type,
          userStatus: userData.status,
          userCreated: userData.createdAt,
          userLastLogin: userData.lastLogin,
        };
        setUsers([formattedUser]); // Wrap in array for table display
      } catch (error: any) {
        console.error("Error fetching user details:", error);
        alert("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  // Handle Edit Button
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  // Handle Save for Edit Modal
  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const { userId, username } = editingUser;
      await axios.put(
        API_ENDPOINTS.EDIT_USER(userId),
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, username } : user
        )
      );
      setShowEditModal(false);
      alert("User details updated successfully.");
    } catch (error: any) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">User Dashboard</h2>

      {/* User Table */}
      <Table bordered hover>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>User Type</th>
            <th>User Status</th>
            <th>User Created</th>
            <th>User Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.userType}</td>
              <td>
                <span
                  className={`badge ${
                    user.userStatus === "Active" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {user.userStatus}
                </span>
              </td>
              <td>{user.userCreated}</td>
              <td>{user.userLastLogin}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {editingUser && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Dashboard;
