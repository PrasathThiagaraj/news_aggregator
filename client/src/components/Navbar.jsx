import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">NewsAGG</Link>
                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/" className="nav-btn btn-ghost">Feed</Link>
                            <Link to="/saved" className="nav-btn btn-ghost">Saved</Link>
                            <button onClick={handleLogout} className="nav-btn btn-primary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-btn btn-ghost">Login</Link>
                            <Link to="/register" className="nav-btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
