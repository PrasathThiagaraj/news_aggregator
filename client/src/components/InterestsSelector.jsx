import React, { useState, useEffect } from 'react';
import API_URL from '../config';

const CATEGORIES = [
    { id: 'general', label: 'General', emoji: '📰' },
    { id: 'technology', label: 'Technology', emoji: '💻' },
    { id: 'business', label: 'Business', emoji: '💼' },
    { id: 'science', label: 'Science', emoji: '🔬' },
    { id: 'health', label: 'Health', emoji: '🏥' },
    { id: 'sports', label: 'Sports', emoji: '⚽' },
    { id: 'entertainment', label: 'Entertainment', emoji: '🎬' }
];

const InterestsSelector = ({ token, onUpdate }) => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchInterests();
    }, [token]);

    const fetchInterests = async () => {
        try {
            const response = await fetch(`${API_URL}/api/interests`, {
                headers: { 'x-auth-token': token }
            });
            const data = await response.json();
            setInterests(data.interests || []);
        } catch (err) {
            console.error('Error fetching interests:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleInterest = (categoryId) => {
        setInterests(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(i => i !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const saveInterests = async () => {
        setSaving(true);
        try {
            await fetch(`${API_URL}/api/interests`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ interests })
            });
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error saving interests:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Loading interests...</div>;

    return (
        <div className="interests-container">
            <h3>Select Your Interests</h3>
            <p className="interests-subtitle">Choose topics to personalize your news feed</p>
            <div className="interests-grid">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`interest-chip ${interests.includes(cat.id) ? 'active' : ''}`}
                        onClick={() => toggleInterest(cat.id)}
                    >
                        <span className="interest-emoji">{cat.emoji}</span>
                        {cat.label}
                    </button>
                ))}
            </div>
            <button
                className="btn-primary save-interests-btn"
                onClick={saveInterests}
                disabled={saving || interests.length === 0}
            >
                {saving ? 'Saving...' : 'Save & Refresh Feed'}
            </button>
        </div>
    );
};

export default InterestsSelector;
