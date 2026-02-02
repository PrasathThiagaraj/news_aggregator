import React, { useState } from 'react';

const ArticleCard = ({ article, token, onSave }) => {
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/news/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(article)
            });

            if (response.ok) {
                setSaved(true);
                if (onSave) onSave();
            } else {
                const data = await response.json();
                alert(data.message || 'Error saving article');
            }
        } catch (err) {
            alert('Error saving article');
        }
    };

    if (!article.title) return null;

    return (
        <div className="article-card">
            <img
                src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={article.title}
                className="article-image"
            />
            <div className="article-content">
                <div className="article-source">{article.source?.name || 'Unknown Source'}</div>
                <h3 className="article-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </h3>
                <p className="article-desc">{article.description?.substring(0, 120)}...</p>

                <div className="article-actions">
                    {token && (
                        <button
                            className={`btn-sm ${saved ? 'btn-saved' : ''}`}
                            onClick={handleSave}
                            disabled={saved}
                        >
                            {saved ? 'Saved ✓' : 'Save for Later'}
                        </button>
                    )}
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn-sm btn-action">
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
