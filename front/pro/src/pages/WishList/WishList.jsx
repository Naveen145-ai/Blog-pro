import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './WishList.css';

const WishList = () => {
  const [wishlistBlogs, setWishlistBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:9000/api/v1/wishlist', {
          credentials: 'include',
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError('Please log in to view your wishlist');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch wishlist');
        }

        const data = await res.json();
        setWishlistBlogs(data || []);
      } catch (err) {
        setError(err.message || 'Error loading wishlist');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="wishlist-container">
        <h1 className="wishlist-title">My Wishlist</h1>

        {loading && <p className="loading-text">Loading your wishlist...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading && !error && wishlistBlogs.length === 0 && (
          <div className="empty-wishlist">
            <p className="empty-text">Your wishlist is empty</p>
            <Link to="/" className="back-home-btn">
              Explore Blogs
            </Link>
          </div>
        )}

        {!loading && !error && wishlistBlogs.length > 0 && (
          <div className="wishlist-grid">
            {wishlistBlogs.map((blog) => (
              <div className="wishlist-card" key={blog._id}>
                <div className="wishlist-card-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <h3>{blog.title}</h3>
                <p className="blog-preview">{blog.content?.substring(0, 100)}...</p>

                <Link className="read-link" to={`/get-blog/${blog._id}`}>
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
