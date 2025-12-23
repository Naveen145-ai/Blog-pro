import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/v1/me', {
          credentials: 'include',
        });

        if (!mounted) return;
        setIsAuthed(res.ok);
      } catch {
        if (!mounted) return;
        setIsAuthed(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:9000/api/v1/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setIsAuthed(false);
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/create-blog">Create Blog</Link>
      {isAuthed ? (
        <>
          <Link to="/profile">Profile</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
