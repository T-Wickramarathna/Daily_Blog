import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  // 1. Setup our memory box to store our posts array
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. State hooks tracking what the user types into the form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  // 3. Define the base URL of our Spring Boot API
  const API_URL = "http://localhost:8080/api/posts";

  // 4. Create a function to fetch the blog posts from Java
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

  // 5. Run this fetch function automatically when the webpage loads
  useEffect(() => {
    fetchPosts();
  }, []); // The empty brackets [] mean "run only once when the page loads"

  // CREATE or UPDATE form route path submission dispatcher
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the entire webpage

    if (!title || !author || !content) {
      alert("Please fill out all fields before submitting !");
      return;
    }

    // Wrap the state variables into a structured payload matching our Java PostDTO
    const newPostPayload = { title, author, content };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentPostId}`, newPostPayload);
        setIsEditing(false);
        setCurrentPostId(null);
      } else {
        // Send the data package over HTTP POST to Spring Boot
        await axios.post(API_URL, newPostPayload);
      }

      // Clear the input fields on screen if successful
      setTitle('');
      setAuthor('');
      setContent('');

      // Refresh our blog list instantly so the user sees their new entry appear
      fetchPosts();
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  // Populate form tracking variables to perform update routing
  const handleEditClick = (post) => {
    setIsEditing(true);
    setCurrentPostId(post.id);
    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.content);
  };

  // Reset visual editing state back to plain post creation mode
  const cancleEditing = () => {
    setIsEditing(false);
    setCurrentPostId(null);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  // DELETE Operation (DELETE http://localhost:8080/api/posts/{id})
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to permanently erase this blog record?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPosts();
      } catch (error) {
        console.error("Failed executing delete statement context parameter mapping:", error);
      }
    }
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Daily Blog Dashboard</h1>
      </header>

      <main>

        {/* Dynamic Multi-Mode Form Engine (Create / Update Tracker Context) */}
        <section className={`form-card ${isEditing ? 'editing-active' : ''}`}>
          <h2 className='section-title' style={{ margin: 0 }}>{`${isEditing ? "Modifying Entry Mode" : "Write a new Article"}`}</h2>
          <form onSubmit={handleSubmit}>

            <div className='form-group' style={{ marginTop: 8 }}>
              <label>Article Title</label>
              <input type="text"
                className='form-control'
                placeholder='Enter a catchy title...'
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Updates the title state variable on keypress
              />
            </div>

            <div className='form-group'>
              <label>Author Name</label>
              <input type="text"
                className='form-control'
                placeholder='Your name...'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={isEditing} /* Locks downstream changes to primary author tag context */
              />
            </div>

            <div className='form-group'>
              <label>Content</label>
              <textarea rows={5}
                className='form-control'
                placeholder='Write your thoughts here...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button type='submit' className='btn-submit'>
              {`${isEditing ? "Update Article Data" : "Publish Post"}`}
            </button>
            {isEditing && (
              <button type="button" className='btn-cancel' onClick={cancleEditing}>
                Cancle Editing
              </button>
            )}
          </form>
        </section>

        <h2 className="section-title">All Blog Posts</h2>

        {loading ? (
          <p>Loading your posts from the database...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts found. Create your first post!</p>
        ) : (
          //  6. Loop through the array of posts using .map() and render them on screen
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

              {/* Administrative Operational Control Triggers */}
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEditClick(post)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteClick(post.id)}>Delete</button>
              </div>

            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;