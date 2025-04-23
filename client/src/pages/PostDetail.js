import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { authHeader } from '../utils/authHeader';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`, { headers: authHeader() }).then(res => setPost(res.data));
  }, [id]);

  const handleWave = async () => {
    await api.post(`/posts/${id}/wave`, {}, { headers: authHeader() });
    const res = await api.get(`/posts/${id}`, { headers: authHeader() });
    setPost(res.data);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.imageName && <img src={`http://localhost:5000/uploads/${post.imageName}`} alt="post" />}
      <p>{post.content}</p>
      <button onClick={handleWave}>Wave 🌊 ({post.listOfUsersWaved.length})</button>
      <br />
      <Link to="/posts">Go Back</Link>
    </div>
  );
};

export default PostDetail;
