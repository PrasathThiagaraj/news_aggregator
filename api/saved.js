const jwt = require('jsonwebtoken');
const connectDB = require('./_db');
const User = require('./_User');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();
        const user = await User.findById(decoded.user.id);

        if (req.method === 'GET') {
            res.json(user.savedArticles);
        } else if (req.method === 'POST') {
            const { title, description, url, urlToImage, source, publishedAt } = req.body;

            const isSaved = user.savedArticles.some(article => article.url === url);
            if (isSaved) {
                return res.status(400).json({ message: 'Article already saved' });
            }

            const sourceName = typeof source === 'object' ? source?.name : source;
            user.savedArticles.unshift({ title, description, url, urlToImage, source: sourceName, publishedAt });
            await user.save();

            res.json(user.savedArticles);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
