import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:9000/api/v1/get-blog/${id}`);
      const data = await res.json();
      setBlog(data);
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;

  return (
    <div className="blog-details">
      <img src={blog.image} alt={blog.title} />
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
