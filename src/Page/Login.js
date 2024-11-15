import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsernameGlobal }) => {  // Accepting setUsernameGlobal as a prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Send login request to the backend
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response Status:", response.status);  // Log status code

            if (response.ok) {
                const data = await response.json();
                console.log("Login Data:", data);  // Log response body

                setUsernameGlobal(data.username);  // Update the global username state
                alert("Login successful!");
                navigate("/");  // Navigate to home or dashboard after login
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);  // Log any error from the backend
                setError(errorData.message || "Invalid email or password.");
            }
        } catch (err) {
            console.error("Login Error:", err.message);  // Catch any network or fetch errors
            setError(err.message);
        }
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
        </div>
    );
};

export default Login;