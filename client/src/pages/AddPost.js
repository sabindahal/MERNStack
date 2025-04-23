import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/authHeader';

const AddPost = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (file) formData.append('image', file);

    await api.post('/posts', formData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
    navigate('/posts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Post</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;
