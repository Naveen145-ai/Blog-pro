import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./ProfileHistory.css";

const ProfileHistory = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:9000/api/v1/my-blogs", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to load your blogs");
        setBlogs([]);
        return;
      }

      setBlogs(data || []);
    } catch (e) {
      setError(e.message || "Failed to load your blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this blog?");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:9000/api/v1/my-blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || "Failed to delete");
        return;
      }

      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      alert(e.message || "Failed to delete");
    }
  };

  return (
    <>
      <NavBar />
      <div className={`profile-history ${!loading && !error && blogs.length === 0 ? "empty-mode" : ""}`}>
        <div className="profile-history-header">
          <h1 className="profile-history-title">Profile History</h1>
          <button className="refresh-btn" type="button" onClick={load}>
            Refresh
          </button>
        </div>

        {loading && <p className="status-text">Loading...</p>}
        {error && !loading && <p className="error-text">{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <div className="empty-profile">
            <p className="empty-text">No blogs uploaded yet.</p>
            <Link to="/" className="back-home-btn">Explore Blogs</Link>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="myblogs-grid">
            {blogs.map((blog) => (
              <div className="myblog-card" key={blog._id}>
                <div className="myblog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="myblog-body">
                  <h3 className="myblog-title">{blog.title}</h3>
                  <p className="myblog-preview">
                    {blog.content?.substring(0, 120)}...
                  </p>
                  <div className="myblog-actions">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHistory;
