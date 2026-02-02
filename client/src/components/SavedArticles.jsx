import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import API_URL from '../config';

const SavedArticles = ({ token }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const response = await fetch(`${API_URL}/api/saved`, {
                    headers: { 'x-auth-token': token }
                });
                const data = await response.json();
                setArticles(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchSaved();
    }, [token]);

    if (loading) return <div className="loading">Loading saved articles...</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '1.5rem' }}>Your Saved Articles</h2>
            {articles.length === 0 ? <p>No saved articles yet.</p> : (
                <div className="feed-grid">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} article={article} token={token} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedArticles;
