const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token (simplified)
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Available categories for interests
const CATEGORIES = ['general', 'technology', 'business', 'science', 'health', 'sports', 'entertainment'];

// GET /api/news - Fetch Top Headlines (optionally filtered by category)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const categoryParam = category ? `&category=${category}` : '';
        const url = `https://newsapi.org/v2/top-headlines?country=us${categoryParam}&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        console.error('NewsAPI Error:', err.message);
        res.status(500).json({ message: 'Error fetching news' });
    }
});

// GET /api/news/personalized - Fetch news based on user interests
router.get('/personalized', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const interests = user.interests || ['general'];

        // Fetch news for each interest category
        const newsPromises = interests.map(category =>
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
        );

        const responses = await Promise.all(newsPromises);

        // Combine and shuffle articles
        let allArticles = [];
        responses.forEach(response => {
            if (response.data.articles) {
                allArticles = allArticles.concat(response.data.articles);
            }
        });

        // Remove duplicates by URL
        const uniqueArticles = allArticles.filter((article, index, self) =>
            index === self.findIndex(a => a.url === article.url)
        );

        res.json({ articles: uniqueArticles });
    } catch (err) {
        console.error('NewsAPI Error:', err.message);
        res.status(500).json({ message: 'Error fetching personalized news' });
    }
});

// GET /api/news/categories - Get available categories
router.get('/categories', (req, res) => {
    res.json({ categories: CATEGORIES });
});

// PUT /api/news/interests - Update user interests
router.put('/interests', auth, async (req, res) => {
    try {
        const { interests } = req.body;
        const user = await User.findById(req.user.id);
        user.interests = interests;
        await user.save();
        res.json({ interests: user.interests });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET /api/news/interests - Get user interests
router.get('/interests', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ interests: user.interests || [] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST /api/news/save - Save article
router.post('/save', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { title, description, url, urlToImage, source, publishedAt } = req.body;

        const isSaved = user.savedArticles.some(article => article.url === url);
        if (isSaved) {
            return res.status(400).json({ message: 'Article already saved' });
        }

        const sourceName = typeof source === 'object' ? source?.name : source;
        user.savedArticles.unshift({ title, description, url, urlToImage, source: sourceName, publishedAt });
        await user.save();

        res.json(user.savedArticles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET /api/news/saved - Get saved articles
router.get('/saved', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.savedArticles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
