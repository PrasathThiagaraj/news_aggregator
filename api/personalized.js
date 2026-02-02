const jwt = require('jsonwebtoken');
const axios = require('axios');
const connectDB = require('./_db');
const User = require('./_User');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();

        const user = await User.findById(decoded.user.id);
        const interests = user.interests || ['general'];

        const newsPromises = interests.map(category =>
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
        );

        const responses = await Promise.all(newsPromises);
        let allArticles = [];
        responses.forEach(response => {
            if (response.data.articles) {
                allArticles = allArticles.concat(response.data.articles);
            }
        });

        const uniqueArticles = allArticles.filter((article, index, self) =>
            index === self.findIndex(a => a.url === article.url)
        );

        res.json({ articles: uniqueArticles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching personalized news' });
    }
};
