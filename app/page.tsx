"use client";
import React, { useState } from "react";
import axios from "axios";

const AddDoctorPage: React.FC = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/doctors", { name, profession });
      console.log(response.data);
      alert("Doctor created successfully!");
      // Add any further logic here, e.g., navigate to another page
    } catch (error: any) {
      // Explicitly type the error object as 'any' to access 'message'
      alert("Error creating doctor: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
      />
      <button type="submit">Create Doctor</button>
    </form>
  );
};

export default AddDoctorPage;
