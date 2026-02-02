import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsFeed from './components/NewsFeed';
import SavedArticles from './components/SavedArticles';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={!!token} logout={logout} />
        <Routes>
          <Route path="/" element={<NewsFeed token={token} />} />
          <Route path="/saved" element={token ? <SavedArticles token={token} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
