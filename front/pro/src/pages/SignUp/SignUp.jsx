import React from 'react';
import './Signup.css';

const SignUp = () => {
  return (
  <>
      <div className="home-content">

        <div className="signup-box">
        <label>Name:</label>
        <input type="text" name="name" />
        <br />
        <label>Email:</label>
        <input type="email" name="email" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Sign Up</button>

        </div>
      </div>
    </>
  );
};

export default SignUp;
