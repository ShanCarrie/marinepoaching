"use client";

import { useState } from "react";
import styles from "./report.module.css"; // Import CSS module

const Report = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Report submitted successfully!");
        setFormData({ name: "", email: "", location: "", description: "" });
      } else {
        setMessage(data.message || "⚠️ Something went wrong.");
      }
    } catch (error) {
      setMessage("❌ Error submitting the report.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Report Marine Poaching</h1>
      <p className={styles.subtitle}>
        Please provide details about the incident.
      </p>
      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="location"
          placeholder="Location of Incident"
          value={formData.location}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the incident..."
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          required
        ></textarea>

        <button type="submit" className={styles.button}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Report;
