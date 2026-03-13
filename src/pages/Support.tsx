import { useState } from "react";
import axios from "axios";
import "./Support.css";
function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assistance", formData);
      alert("Query Submitted Successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error occurred");
  }

  alert("Something went wrong. Please try again.");
}
  };

  return (
    <div className="support-container">
      <h2>Need Assistance?</h2>

      <form onSubmit={handleSubmit} className="support-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Write your query here..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
}

export default Support;