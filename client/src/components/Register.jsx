import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const Register = ({ setToken }) => {
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
            const res = await axios.post(`${API_URL}/api/register`, formData);
            setToken(res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign Up</h2>
                {error && <p className="error-msg" style={{ marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={username} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn-block">Register</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <a href="/login" style={{ color: 'var(--primary)' }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
