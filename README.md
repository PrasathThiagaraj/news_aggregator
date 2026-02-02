# Personal News Aggregator

A simple full-stack web application that aggregates news articles based on user interests.  
This project focuses on building a functional end-to-end system with authentication, content aggregation, and basic user interaction.

---

## Features

- 🔐 **User Authentication** – User registration and login
- 📰 **News Feed** – Fetch and display news articles from a public news API
- 💾 **Article Management** – Save articles for later reading
- 🧩 **Modular Structure** – Clear separation of frontend and backend concerns
- 🎨 **Clean UI** – Simple and functional interface

---

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT-based authentication
- NewsAPI (News aggregation)

### Frontend
- React
- React Router
- Axios
- Vanilla CSS

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- NewsAPI Key

---

### Installation

1. **Navigate to the project directory**
   ```bash
   cd news_agg

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

## Usage Guide

1. **Sign Up** - Create a new account
2. **Browse News** - View the latest headlines based on your interest on the homepage
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
- `POST /api/news/save` - Save article
- `GET /api/news/saved` - Get saved articles

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running locally or your Atlas IP is whitelisted
- Check your `MONGO_URI` in `.env`

**API Errors:**
- Verify your NewsAPI key are valid

**Port Conflicts:**
- Backend runs on port 5000
- Frontend runs on port 5173
- Make sure these ports are available

## Notes

- Some articles may not have full content from NewsAPI

## License

MIT
