const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

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
};
