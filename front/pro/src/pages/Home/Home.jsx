import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/v1/get-blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <NavBar />

      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3>{blog.title}</h3>
            <img src={blog.image} alt={blog.title} />
            
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
