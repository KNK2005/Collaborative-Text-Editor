import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsernameGlobal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Store the JWT token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);  // Store username in localStorage
        alert("Login successful!");
        setUsernameGlobal(data.username); // Update global state here
        navigate("/");  // Navigate to the home page or dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Error during login. Please try again.");
    }
  };

  // Navigate to the signup page
  const navigateToSignup = () => {
    navigate("/create-account");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{error}</p>
      <button onClick={handleLogin}>Log In</button>
      
      {/* Link to Signup */}
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={navigateToSignup}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Login;
