import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Register.css';
import { setCredentials } from '../app/authSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}api/register/`, {
        username,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      dispatch(setCredentials({
        user: response.data.user,
      }));
      navigate('/');
    } catch (err) {
      setError(err.response.data.error || 'An error occurred during registration');
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already a user? <span className="link" onClick={() => navigate('/login')}>Login here</span>.</p>
    </div>
  );
};

export default Register;
