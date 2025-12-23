import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || "Signup successful");

      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="home-content">
      <div className="signup-box">
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />

        <button onClick={handleSubmit}>Sign Up</button>

        <p className="switch-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
