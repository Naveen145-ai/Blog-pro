import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || "Login successful");

      if (res.ok) {
        const to = location.state?.from || "/";
        navigate(to);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="home-content">
      <div className="login-box">
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />

        <button onClick={handleLogin}>Login</button>

        <p className="switch-text">
          Don’t have an account? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
