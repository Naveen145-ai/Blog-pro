import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('http://localhost:9000/api/v1/get-blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <NavBar />

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>

            <Link className="read-link" to={`/blog/${blog._id}`}>
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
