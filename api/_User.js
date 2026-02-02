const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interests: { type: [String], default: ['general'] },
    savedArticles: [{
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        source: String,
        publishedAt: String,
        savedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
