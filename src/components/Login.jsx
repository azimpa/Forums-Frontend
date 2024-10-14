import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Login.css';
import { setCredentials } from '../app/authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const baseURL = import.meta.env.VITE_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}api/login/`, {
                username,
                password
            });
            console.log(response.data, "oooooo");
            localStorage.setItem('token', response.data.token);
            dispatch(setCredentials({
                user: response.data.user,
            }));
            navigate('/');
        } catch (err) {
            setError(err.response.data.error || 'Invalid credentials');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>If new user, <span className="link" onClick={() => navigate('/register')}>register here</span>.</p>
        </div>
    );
};

export default Login;
