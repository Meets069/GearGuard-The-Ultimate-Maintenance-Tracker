// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/signup",
//         { email, password }
//       );
//       alert(res.data.message);
//       navigate("/");
//     } catch (err) {
//       alert(err.response.data.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-card" onSubmit={handleSignup}>
//         <h2>Create Account</h2>
//         <p className="subtitle">Register to access the portal</p>

//         <input
//           type="email"
//           placeholder="Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Sign Up</button>

//         <p className="login-link">
//           Already have an account?
//           <span onClick={() => navigate("/")}> Login</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  
//   // New states for Role-Based Access
//   const [role, setRole] = useState("Requester"); 
//   const [team, setTeam] = useState(""); 
  
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     // Logic: If they are a technician, they MUST have a team
//     if (role === "Technician" && !team) {
//       alert("Technicians must be assigned to a team (IT, Mechanics, or Electrical)");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/signup", {
//         name,
//         email,
//         password,
//         role,
//         team: role === "Technician" ? team : null // Only send team if they are a tech
//       });
//       alert(res.data.message);
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-card" onSubmit={handleSignup}>
//         <h2>Create Account</h2>
//         <p className="subtitle">Join GearGuard Maintenance System</p>

//         <input
//           type="text"
//           placeholder="Full Name"
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         {/* --- ROLE SELECTION --- */}
//         <div className="form-group">
//           <label>Select Your Role:</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)} className="signup-select">
//             <option value="Requester">Employee / Requester</option>
//             <option value="Technician">Maintenance Technician</option>
//             <option value="Manager">Maintenance Manager</option>
//           </select>
//         </div>

//         {/* --- CONDITIONAL TEAM SELECTION (Only shows for Technicians) --- */}
//         {role === "Technician" && (
//           <div className="form-group">
//             <label>Select Your Specialized Team:</label>
//             <select value={team} onChange={(e) => setTeam(e.target.value)} className="signup-select" required>
//               <option value="">-- Choose Team --</option>
//               <option value="IT">IT Support</option>
//               <option value="Mechanics">Mechanics</option>
//               <option value="Electrical">Electrical</option>
//             </select>
//           </div>
//         )}

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Sign Up</button>

//         <p className="login-link">
//           Already have an account?
//           <span onClick={() => navigate("/")}> Login</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Requester",
    team: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join the GearGuard Network</p>
        </div>

        <div className="form-body">
          <input className="custom-input" name="name" placeholder="Full Name" onChange={handleChange} required />
          
          <input className="custom-input" name="email" type="email" placeholder="Email Address" onChange={handleChange} required />

          {/* ROLE SELECTOR - Styled exactly like the inputs */}
          <select className="custom-input custom-select" name="role" value={formData.role} onChange={handleChange}>
            <option value="Requester">Role: Requester</option>
            <option value="Technician">Role: Maintenance Technician</option>
            <option value="Manager">Role: Maintenance Manager</option>
          </select>

          {/* TEAM SELECTOR - Only shows for Technicians */}
          {formData.role === "Technician" && (
            <select className="custom-input custom-select team-animate" name="team" onChange={handleChange} required>
              <option value="">-- Select Your Team --</option>
              <option value="IT">IT Support</option>
              <option value="Mechanics">Mechanics Team</option>
              <option value="Electrical">Electrical Team</option>
            </select>
          )}

          <input className="custom-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          
          <input className="custom-input" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        </div>

        <button type="submit" className="signup-button">Register Now</button>

        <p className="login-footer">
          Already have an account? <span onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
