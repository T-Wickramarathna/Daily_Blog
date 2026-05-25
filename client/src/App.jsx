import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  // 1. Setup our memory box to store our posts array
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Define the base URL of our Spring Boot API
  const API_URL = "http://localhost:8080/api/posts";

  // 3. Create a function to fetch the blog posts from Java
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from backend", error);
      setLoading(false);
    }
  };

  // 4. Run this fetch function automatically when the webpage loads
  useEffect(() => {
    fetchPosts();
  }, []); // The empty brackets [] mean "run only once when the page loads"

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Daily Blog Dashboard</h1>
      </header>

      <main>
        <h2 className="section-title">All Blog Posts</h2>

        {loading ? (
          <p>Loading your posts from the database...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts found. Create your first post!</p>
        ) : (
          //  5. Loop through the array of posts using .map() and render them on screen
          posts.map((post) => (
            <div key={post.id} className="blog-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>

              <div className="post-meta">
                <span className="author-tag">
                  <strong>By:</strong> {post.author}
                </span>
                <span className="date-tag">
                  <strong>Posted:</strong> {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;