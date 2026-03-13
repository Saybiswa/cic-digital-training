import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/forgot-password", {
        email,
        dob,
        empId,
        password
      });

      alert("Password reset successful");

    } catch (error) {
      console.error(error);
      alert("Invalid user details");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h2>Reset Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="forgot-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="date"
          className="forgot-input"
          onChange={(e) => setDob(e.target.value)}
        />

        <input
          type="text"
          placeholder="Employee ID"
          className="forgot-input"
          onChange={(e) => setEmpId(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="forgot-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="forgot-input"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="forgot-button" onClick={handleSubmit}>
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;