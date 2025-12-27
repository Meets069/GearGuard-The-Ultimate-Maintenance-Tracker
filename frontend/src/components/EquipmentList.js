import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./EquipmentList.css";

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/equipment/all");
      setEquipment(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching equipment");
      setLoading(false);
    }
  };

  return (
    <div className="equipment-page">
      <div className="list-header">
        <div>
          <h2>Asset Inventory</h2>
          <p>Total Managed Assets: <strong>{equipment.length}</strong></p>
        </div>
        
        {/* THE NEW BUTTON - Only visible to Managers */}
        <div className="header-actions">
          {userRole === "Manager" && (
            <button 
              className="new-asset-btn" 
              onClick={() => navigate("/add-equipment")}
            >
              <span className="plus-icon">+</span> New Asset
            </button>
          )}
        </div>
      </div>

      <hr className="divider" />

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading Assets...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Machine Name</th>
                <th>Serial Number</th>
                <th>Department</th>
                <th>Team</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.length > 0 ? (
                equipment.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="machine-info">
                        <span className="machine-name">{item.name}</span>
                        <span className="machine-loc">{item.location}</span>
                      </div>
                    </td>
                    <td><code className="serial-text">{item.serialNumber}</code></td>
                    <td>{item.department}</td>
                    <td>
                      <span className={`team-tag ${item.maintenanceTeam?.toLowerCase()}`}>
                        {item.maintenanceTeam}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${item.status?.toLowerCase().replace(" ", "-")}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {userRole === "Requester" && item.status !== "Scrapped" && (
                        <button 
                          className="report-btn"
                          onClick={() => navigate(`/create-request?equipId=${item._id}`)}
                        >
                          ⚠️ Report Breakdown
                        </button>
                      )}
                      {userRole === "Manager" && (
                        <button className="edit-btn" onClick={() => navigate(`/edit-equipment/${item._id}`)}>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No equipment found. Add your first asset!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EquipmentList;