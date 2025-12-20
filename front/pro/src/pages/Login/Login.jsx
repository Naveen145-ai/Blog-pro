import React from 'react';
import './Login.css';
const Login = () => {
  return (
    <>
    
      <div className="home-content">

        <div className="login-box">
      <label>Name:</label>
      <input type="text" name="name" />
      <br />
      <label>Password:</label>    
      <input type="password" name="password" />
      <br />
      <button type="submit">Login</button>  
      </div>
      </div>
    </>
  );
};

export default Login;
