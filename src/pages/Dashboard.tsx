import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdOn: string;
  updatedOn: string;
}

interface ApiErrorResponse {
  message: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserData = async (email: string, token: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pm-api.deval.us/api/user/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({token});
      setUserData(response.data.data);
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      setError(
        error.response?.data?.message || "Failed to fetch user data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      alert("Session expired. Redirecting to login.");
      navigate("/");
      return;
    }

    fetchUserData(email, token);
  }, [navigate]);

  if (error) {
    return (
      <Container className="my-5">
        <h2 className="text-center text-danger">{error}</h2>
      </Container>
    );
  }

  if (loading || !userData) {
    return (
      <Container className="my-5">
        <h2 className="text-center">Loading user details...</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">User Dashboard</h2>
      <form>
        <div>
          <label>
            <strong>First Name:</strong>
          </label>
          <span> {userData.firstName}</span>
        </div>
        <div>
          <label>
            <strong>Last Name:</strong>
          </label>
          <span> {userData.lastName}</span>
        </div>
        <div>
          <label>
            <strong>Email:</strong>
          </label>
          <span> {userData.email}</span>
        </div>
        <div>
          <label>
            <strong>Role:</strong>
          </label>
          <span> {userData.role}</span>
        </div>
        <div>
          <label>
            <strong>Active:</strong>
          </label>
          <span> {userData.isActive ? "Yes" : "No"}</span>
        </div>
        <div>
          <label>
            <strong>Created On:</strong>
          </label>
          <span> {new Date(userData.createdOn).toLocaleString()}</span>
        </div>
        <div>
          <label>
            <strong>Updated On:</strong>
          </label>
          <span> {new Date(userData.updatedOn).toLocaleString()}</span>
        </div>
      </form>
    </Container>
  );
};

export default Dashboard;
