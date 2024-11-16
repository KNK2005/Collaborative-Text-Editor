// Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);  // To track errors
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If there is no token, redirect to the login page
      navigate("/login");
      return;
    }

    // Fetch user details from the backend
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
          // Set user information in the state
          setUserInfo({ username: data.username, email: data.email });
        } else {
          console.error("Error:", data.message);
          setError(data.message || "Failed to fetch user information.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details.");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div>
            <strong>Username:</strong> {userInfo.username || "Loading..."}
          </div>
          <div>
            <strong>Email:</strong> {userInfo.email || "Loading..."}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
