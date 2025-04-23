import React, { useEffect, useState } from 'react';
import api from '../utils/axiosConfig';
import { Link } from 'react-router-dom';
import { authHeader } from '../utils/authHeader';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts', { headers: authHeader() }).then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <Link to="/add-post">Add New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link> - Waves: {post.listOfUsersWaved.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
