import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/v1/me', {
          credentials: 'include',
        });

        const data = await res.json().catch(() => ({}));

        if (!mounted) return;
        setIsAuthed(res.ok);
        setUser(res.ok ? data.user : null);
      } catch {
        if (!mounted) return;
        setIsAuthed(false);
        setUser(null);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:9000/api/v1/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setIsAuthed(false);
      setUser(null);
      setOpen(false);
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/create-blog">Create Blog</Link>
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        {isAuthed ? (
          <>
            <button
              type="button"
              className="navbar-btn"
              onClick={() => setOpen((v) => !v)}
            >
              Profile
            </button>

            {open && (
              <div className="profile-dropdown">
                <div className="profile-row">
                  <div className="profile-label">Name</div>
                  <div className="profile-value">{user?.name || '-'}</div>
                </div>
                <div className="profile-row">
                  <div className="profile-label">Email</div>
                  <div className="profile-value">{user?.email || '-'}</div>
                </div>

                <button
                  type="button"
                  className="dropdown-action"
                  onClick={() => {
                    setOpen(false);
                    navigate('/profile-history');
                  }}
                >
                  Profile History
                </button>
              </div>
            )}

            <button type="button" className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
