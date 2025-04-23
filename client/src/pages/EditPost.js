import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { authHeader } from '../utils/authHeader';

const EditPost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`, { headers: authHeader() }).then(res =>
      setForm({ title: res.data.title, content: res.data.content })
    );
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (file) formData.append('image', file);

    await api.put(`/posts/${id}`, formData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
    navigate('/posts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input name="title" value={form.title} onChange={handleChange} />
      <textarea name="content" value={form.content} onChange={handleChange}></textarea>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPost;
