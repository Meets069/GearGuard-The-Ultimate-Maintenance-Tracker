import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"; // Reuse your existing professional CSS

function AddEquipment() {
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    department: "",
    maintenanceTeam: "IT",
    location: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/equipment/add", formData);
      alert(res.data.message);
      navigate("/dashboard"); // Go back to dashboard after saving
    } catch (err) {
      alert(err.response?.data?.message || "Error adding equipment");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <div className="signup-header">
          <h2>Register Asset</h2>
          <p>Add new machinery to the GearGuard system</p>
        </div>

        <div className="form-body">
          <input className="custom-input" name="name" placeholder="Equipment Name" onChange={handleChange} required />
          <input className="custom-input" name="serialNumber" placeholder="Serial Number / ID" onChange={handleChange} required />
          <input className="custom-input" name="department" placeholder="Department (e.g. Production)" onChange={handleChange} required />
          
          <label style={{fontSize: '12px', color: '#666', marginLeft: '5px'}}>Responsible Team:</label>
          <select className="custom-input custom-select" name="maintenanceTeam" onChange={handleChange}>
            <option value="IT">IT Support</option>
            <option value="Mechanics">Mechanics Team</option>
            <option value="Electrical">Electrical Team</option>
          </select>

          <input className="custom-input" name="location" placeholder="Physical Location (Floor/Room)" onChange={handleChange} required />
        </div>

        <button type="submit" className="signup-button">Save Equipment</button>
        <button type="button" className="signup-button" style={{backgroundColor: '#6c757d', marginTop: '10px'}} onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEquipment;