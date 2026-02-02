import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import InterestsSelector from './InterestsSelector';

const NewsFeed = ({ token }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInterests, setShowInterests] = useState(false);

    useEffect(() => {
        fetchNews();
    }, [token]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            let url = 'http://localhost:5000/api/news';
            let headers = {};

            // If logged in, fetch personalized news
            if (token) {
                url = 'http://localhost:5000/api/news/personalized';
                headers = { 'x-auth-token': token };
            }

            const response = await fetch(url, { headers });
            const data = await response.json();
            setArticles(data.articles || []);
        } catch (err) {
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInterestsUpdate = () => {
        setShowInterests(false);
        fetchNews();
    };

    if (loading) return <div className="loading">Loading news...</div>;

    return (
        <div className="container">
            <div className="feed-header">
                <h2>{token ? 'Your Personalized Feed' : 'Top Headlines'}</h2>
                {token && (
                    <button
                        className="btn-sm btn-action"
                        onClick={() => setShowInterests(!showInterests)}
                    >
                        {showInterests ? 'Hide Interests' : '⚙️ Manage Interests'}
                    </button>
                )}
            </div>

            {showInterests && token && (
                <InterestsSelector token={token} onUpdate={handleInterestsUpdate} />
            )}

            {articles.length === 0 ? (
                <p className="no-articles">No articles found. Try updating your interests!</p>
            ) : (
                <div className="feed-grid">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} article={article} token={token} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsFeed;
