import React from 'react';
import { useNavigate } from 'react-router-dom';

function EquipmentCard({ equipment, requestCount }) {
  const navigate = useNavigate();

  return (
    <div className="equipment-card">
      <div className="card-header">
        <h4>{equipment.name}</h4>
        {/* THE SMART BUTTON */}
        <button 
          className="smart-button"
          onClick={() => navigate(`/maintenance?equipmentId=${equipment._id}`)}
        >
          <span className="badge">{requestCount}</span>
          🔧 Maintenance
        </button>
      </div>
      
      <div className="card-body">
        <p><strong>Serial:</strong> {equipment.serialNumber}</p>
        <p><strong>Team:</strong> {equipment.maintenanceTeam}</p>
        <p><strong>Status:</strong> 
          <span className={`status-tag ${equipment.status.toLowerCase()}`}>
            {equipment.status}
          </span>
        </p>
      </div>
    </div>
  );
}