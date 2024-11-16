import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/user-profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.username && data.email) {
            setUserInfo({ username: data.username, email: data.email });
          } else {
            setError("Error fetching user info.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Failed to fetch user information.");
        });
    } else {
      setError("No token found. Please login again.");
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to Home after logout
  };

  return (
    <div className="profile-page">
      <h2>Welcome to your Dashboard</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div className="user-info">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;
