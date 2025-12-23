import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError('No search query provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await fetch(
          `http://localhost:9000/api/v1/search?q=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await res.json();
        setBlogs(data || []);
      } catch (err) {
        setError(err.message || 'Error loading search results');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-results-container">
        <div className="search-results-header">
          <h1 className="search-results-title">
            Search Results for: <span className="search-query">"{query}"</span>
          </h1>
          {!loading && !error && blogs.length > 0 && (
            <p className="results-count">Found {blogs.length} blog(s)</p>
          )}
        </div>

        {loading && <p className="status-text">Loading results...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No blogs found matching your search.</p>
            <Link to="/" className="back-home-link">
              Back to Home
            </Link>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="search-results-grid">
            {blogs.map((blog) => (
              <div className="search-result-card" key={blog._id}>
                <div className="result-card-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="result-card-body">
                  <h3 className="result-card-title">{blog.title}</h3>
                  <p className="result-card-preview">
                    {blog.content?.substring(0, 150)}...
                  </p>
                  <div className="result-card-author">
                    By: <span>{blog.author?.name || 'Unknown'}</span>
                  </div>
                  <Link
                    to={`/get-blog/${blog._id}`}
                    className="result-card-link"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
