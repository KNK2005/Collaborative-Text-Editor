import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [documents, setDocuments] = useState([]); // To store documents
  const [error, setError] = useState(null); // To track errors
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setUserInfo({ username: data.username, email: data.email });
        } else {
          setError(data.message || "Failed to fetch user information.");
        }
      } catch (error) {
        setError("Error fetching user details.");
      }
    };

    // Fetch saved documents
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/documents", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setDocuments(data.documents || []);
        } else {
          setError(data.message || "Failed to fetch documents.");
        }
      } catch (error) {
        setError("Error fetching documents.");
      }
    };

    fetchUserDetails();
    fetchDocuments();
  }, [navigate]);

  const openTextEditor = (docId) => {
    // Navigate to the text editor with the document ID
    navigate(`/text-editor/${docId}`);
  };

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>

    </div>
  );
};

export default Dashboard;
