import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Call handleLogout to reset the username state in App.js
    handleLogout();

    // Clear the token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect the user to the homepage (or any other route)
    navigate("/");
  }, [handleLogout, navigate]);

  return (
    <div>
      <p>Logging you out...</p>
    </div>
  );
};

export default Logout;
