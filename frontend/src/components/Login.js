// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/login",
//         { email, password }
//       );

//       setMessage(res.data.message);

//       // Redirect to dashboard after successful login
//       navigate("/dashboard");

//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-card" onSubmit={handleLogin}>
//         <h2 className="login-title">Login</h2>

//         {error && <p className="login-error">{error}</p>}
//         {message && <p className="login-success">{message}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           className="login-input"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="login-input"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="login-button">
//           Login
//         </button>

//         <p className="login-link" onClick={() => navigate("/signup")}>
//           Create Account
//         </p>

//         <p className="login-link" onClick={() => navigate("/forgot-password")}>
//           Forgot Password?
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("Requester"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", { 
        email, 
        password,
        role // Sending role to backend to verify correct login type
      });

      const { user, message: resMessage } = res.data;
      
      // Ensure the user logging in matches the role selected on the bar
      if (user.role !== role) {
        setError(`This account is not registered as a ${role}`);
        return;
      }

      setMessage(resMessage);

      // Save session info
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userTeam", user.team || "");
      localStorage.setItem("userName", user.name);

      // Routing logic
      if (user.role === "Manager") navigate("/admin-dashboard");
      else if (user.role === "Technician") navigate("/kanban-board");
      else navigate("/equipment-list");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">GearGuard</h2>

        {/* --- THREE USER ROLE BAR --- */}
        <div className="role-selector-bar">
          <button 
            type="button"
            className={role === "Requester" ? "active" : ""} 
            onClick={() => setRole("Requester")}
          >
            Requester
          </button>
          <button 
            type="button"
            className={role === "Technician" ? "active" : ""} 
            onClick={() => setRole("Technician")}
          >
            Technician
          </button>
          <button 
            type="button"
            className={role === "Manager" ? "active" : ""} 
            onClick={() => setRole("Manager")}
          >
            Manager
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>}

        <div className="input-group">
          <label>Logging in as: <strong>{role}</strong></label>
          <input
            type="email"
            placeholder="Email Address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Sign In
        </button>

        <div className="login-footer">
          <p onClick={() => navigate("/signup")}>New here? Create Account</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
