import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config';

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/login`, formData);
            setToken(res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <div className="auth-logo">📰</div>
                <h2>NewsAGG</h2>
                <p className="auth-subtitle">Sign in to your account</p>

                {error && <p className="error-msg" style={{ marginBottom: '1rem', textAlign: 'left' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-block">Sign In</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
