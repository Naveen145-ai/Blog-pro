const Login = () => {
  return (
    <>
    
      <div className="home-content">
      <label>Name:</label>
      <input type="text" name="name" />
      <br />
      <label>Password:</label>    
      <input type="password" name="password" />
      <br />
      <button type="submit">Login</button>  
      </div>
    </>
  );
};

export default Login;
