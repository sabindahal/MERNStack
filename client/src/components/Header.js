import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link to="/posts" style={styles.logo}>🌊 PostWave</Link>
      </div>
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.username}>{user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#f0f0f0',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: '#333',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  username: {
    fontWeight: 'bold',
  },
  button: {
    padding: '5px 10px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
  },
};

export default Header;
