import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="home-content">
      <div className="login-box">
        <label>Name:</label>
        <input type="text" name="name" />

        <label>Password:</label>
        <input type="password" name="password" />

        <button type="submit">Login</button>

        {/* 👇 Link below box */}
        <p className="switch-text">
          Don’t have an account?{" "}
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
