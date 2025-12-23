import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/v1/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Failed to load profile");
          return;
        }

        setUser(data.user);
      } catch (e) {
        setError(e.message || "Failed to load profile");
      }
    };

    load();
  }, []);

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h1>Profile</h1>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!error && !user && <p>Loading...</p>}
        {user && (
          <div className="profile-content">
            <div className="profile-icon-section">
              <div className="profile-icon">
                👤
              </div>
            </div>
            <div className="profile-details">
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Signup Time:</b> {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
              </p>
              <p>
                <b>Last Login:</b> {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "-"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
