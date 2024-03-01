import React, { useState } from 'react';
import axios from 'axios';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Send POST request to backend API
    axios.post('http://localhost:3000/api/v1/posts', {
      post: {
        title: title,
        content: content
      }
    })
    .then(response => {
      console.log('Post added successfully:', response.data);
      // Optionally, perform any additional actions after successful submission
      // For example, redirect to another page or update state
    })
    .catch(error => {
      console.error('Error adding post:', error);
      // Optionally, handle error cases (e.g., display error message to user)
    });
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddPostForm;
