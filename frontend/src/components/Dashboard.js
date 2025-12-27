import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [critical, setCritical] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from backend APIs
    axios.get("http://localhost:5000/api/critical").then(res => setCritical(res.data));
    axios.get("http://localhost:5000/api/technicians").then(res => setTechnicians(res.data));
    axios.get("http://localhost:5000/api/requests").then(res => setRequests(res.data));
    axios.get("http://localhost:5000/api/employees").then(res => setEmployees(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <button>Maintenance</button>
        <button>Dashboard</button>
        <button>Maintenance Calendar</button>
        <button>Equipment</button>
        <button>Reporting</button>
        <button>Teams</button>
      </nav>

      <div className="dashboard-cards">
        <div className="card critical-card">
          <h3>Critical Equipment</h3>
          <p>{critical.length} Units (Health &lt; 30%)</p>
        </div>

        <div className="card technician-card">
          <h3>Technician Load</h3>
          {technicians.map(t => <p key={t.id}>{t.name}: {t.load}%</p>)}
        </div>

        <div className="card requests-card">
          <h3>Open Requests</h3>
          {requests.map(r => <p key={r.id}>{r.title} - {r.status}</p>)}
        </div>
      </div>

      <div className="employee-table">
        <h3>Employee Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Technician</th>
              <th>Category</th>
              <th>Stage</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.technician}</td>
                <td>{emp.category}</td>
                <td>{emp.stage}</td>
                <td>{emp.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
