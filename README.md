# Personal News Aggregator with AI Summarization

A simple full-stack web application that aggregates news articles and provides AI-powered summaries using the Gemini API.

## Features

- 🔐 **User Authentication** - Register and login
- 📰 **News Feed** - View top headlines from NewsAPI
- 🤖 **AI Summarization** - Get quick summaries powered by Google Gemini
- 💾 **Save Articles** - Bookmark articles for later reading
- 📱 **Clean UI** - Simple and responsive design

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Gemini API (AI Summarization)
- NewsAPI (News Aggregation)

**Frontend:**
- React (Vite)
- React Router
- Axios
- Vanilla CSS

## Setup Instructions

### Prerequisites
- Node.js (v20+)
- MongoDB (local or Atlas)
- NewsAPI Key (from [newsapi.org](https://newsapi.org))
- Gemini API Key (from [Google AI Studio](https://aistudio.google.com))

### Installation

1. **Clone/Navigate to the project**
   ```bash
   cd news_agg
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Edit `server/.env` with your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NEWS_API_KEY=your_newsapi_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Open your browser to: **http://localhost:5173**

## Usage Guide

1. **Sign Up** - Create a new account
2. **Browse News** - View the latest headlines on the homepage
3. **Summarize** - Click "Summarize with AI" on any article
4. **Save Articles** - Click "Save for Later" (requires login)
5. **View Saved** - Access your saved articles from the "Saved" tab

## Project Structure

```
news_agg/
├── server/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── news.js
│   ├── index.js
│   ├── .env
│   └── package.json
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── NewsFeed.jsx
    │   │   ├── ArticleCard.jsx
    │   │   ├── SavedArticles.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### News
- `GET /api/news` - Fetch top headlines
- `POST /api/news/summarize` - Generate AI summary
- `POST /api/news/save` - Save article (requires auth)
- `GET /api/news/saved` - Get saved articles (requires auth)

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running locally or your Atlas IP is whitelisted
- Check your `MONGO_URI` in `.env`

**API Errors:**
- Verify your NewsAPI and Gemini API keys are valid
- Check API quota limits (Gemini free tier has rate limits)

**Port Conflicts:**
- Backend runs on port 5000
- Frontend runs on port 5173
- Make sure these ports are available

## Notes

- The AI summarization works best when articles have descriptions
- Some articles may not have full content from NewsAPI
- Gemini API free tier has usage limits

## License

MIT
