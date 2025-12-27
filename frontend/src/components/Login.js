import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
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
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      setMessage(res.data.message);

      // Redirect to dashboard after successful login
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="login-link" onClick={() => navigate("/signup")}>
          Create Account
        </p>

        <p className="login-link" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>
      </form>
    </div>
  );
}

export default Login;
