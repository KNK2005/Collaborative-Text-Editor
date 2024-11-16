import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Signup = async () => {
    if (pass !== cpass) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: pass,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("An error occurred during signup.");
    }
  };

  return (
    <>
      <div className="main-content">
        <div id="signup">
          <h2>Welcome to SyncWrite</h2>
          <h4>Please enter your details.</h4>
          <input
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter Your Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            placeholder="Confirm Your Password"
            type="password"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
          />

          <p>{error}</p>

          <button onClick={Signup}>Create Account</button><br /><br />

          <Link to="/login">Already Have an Account? Login Here.</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
