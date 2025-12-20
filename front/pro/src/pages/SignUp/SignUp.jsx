import { Link } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  return (
    <div className="home-content">
      <div className="signup-box">
        <label>Name:</label>
        <input type="text" name="name" />

        <label>Email:</label>
        <input type="email" name="email" />

        <label>Password:</label>
        <input type="password" name="password" />

        <button type="submit">Sign Up</button>

        {/* 👇 Link below box */}
        <p className="switch-text">
          Already registered?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
