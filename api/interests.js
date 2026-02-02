const jwt = require('jsonwebtoken');
const connectDB = require('./_db');
const User = require('./_User');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();
        const user = await User.findById(decoded.user.id);

        if (req.method === 'GET') {
            res.json({ interests: user.interests || [] });
        } else if (req.method === 'PUT') {
            user.interests = req.body.interests;
            await user.save();
            res.json({ interests: user.interests });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
