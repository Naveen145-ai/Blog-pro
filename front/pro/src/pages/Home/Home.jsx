import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/v1/get-blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/v1/wishlist', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setWishlist(data.map((blog) => blog._id || blog));
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    };

    fetchBlogs();
    fetchWishlist();
  }, []);

  const toggleWishlist = async (blogId) => {
    try {
      const res = await fetch('http://localhost:9000/api/v1/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ blogId }),
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist([...wishlist, blogId]);
        setMessage({ type: 'success', text: 'Added to wishlist!' });
      } else if (data.message === 'Already in wishlist') {
        setMessage({ type: 'info', text: 'Already in your wishlist' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add to wishlist' });
      }
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('Not authorized')) {
        setMessage({ type: 'error', text: 'Please log in first' });
      } else {
        setMessage({ type: 'error', text: 'Error: ' + err.message });
      }
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <>
      <NavBar />

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div className="blog-card-image">
              <img src={blog.image} alt={blog.title} />
            </div>
            <h3>{blog.title}</h3>

            <div className="blog-card-footer">
              <Link className="read-link" to={`/get-blog/${blog._id}`}>
                Read More →
              </Link>
              <button
                className={`wishlist-btn ${wishlist.includes(blog._id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(blog._id)}
                title={wishlist.includes(blog._id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
