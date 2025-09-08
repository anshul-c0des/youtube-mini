# 🎬 YouTube Mini

A simple React Native app that fetches and plays YouTube videos, using a Node.js + MongoDB backend. It displays a list of YouTube videos (from MongoDB), enriched with metadata using the YouTube Data API, and allows users to play videos inside the app.

This project demonstrates full-stack integration (React Native + Express + MongoDB), API usage (YouTube Data API v3), and thoughtful architectural decisions for constrained environments like Expo Go.


---

## 🚀 Tech Stack

### Client
- React Native (with Expo)
- React Navigation (stack navigation)
- Axios (API calls)
- React Native WebView (for in-app YouTube playback)
- Expo Go (for fast development/testing)

### Server
- Node.js
- Express.js
- MongoDB (via MongoDB Atlas + Compass)
- Mongoose
- Axios (YouTube API integration)
- dotenv (for managing API keys)

---

## 📂 Folder Structure
```bash
youtube-mini/
├── client/               # React Native app
│   ├── App.js
│   ├── screens/
│   │   ├── VideoListScreen.js
│   │   └── VideoPlayerScreen.js
│   └── assets/
│
├── server/               # Node.js backend API
│   ├── index.js
│   ├── models/
│   │   └── Video.js
│   ├── routes/
│   │   └── videos.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── ...
```

---

## 🛠️ Getting Started

### ✅ Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB + Compass
- Youtube Data Api v3
- Expo Go app (on your phone)

### 📲 Client Setup (React Native)
```bash
cd client
npm install
```

Run the app:
```bash
npx expo start
```

Scan the QR code with the Expo Go app on your phone.

🔥 Note: Videos are played using WebView with embedded YouTube URL due to Expo Go limitations with native modules like react-native-youtube-iframe.

### 🖥️ Server Setup (Node.js + MongoDB)
```bash
cd server
npm install
```

- Add .env file:
```bash
YOUTUBE_API_KEY=your_youtube_api_key
MONGO_URI=your_mongodb_connection_string
```

You can get the Mongo URI from MongoDB Atlas, and the YouTube API key from the Google Developers Console.

- Start the server:
```bash
node index.js
```

- Server should run on http://localhost:5000

### 🌱 Seeding MongoDB

- Use MongoDB Compass to manually seed your DB with 10 documents:

```bash
{
  "videoId": "dQw4w9WgXcQ"
}
```
Each document should only include the videoId. The server will fetch metadata via the YouTube API when /videos is called.

### 🔗 API Endpoint
GET /videos
- Returns enriched metadata for the 10 stored video IDs:
```bash
[
  {
    "videoId": "dQw4w9WgXcQ",
    "title": "...",
    "channelTitle": "...",
    "thumbnail": "...",
    "duration": "PT4M13S"
  }
]
```

---

## ✨ Features

- ✅ Fetches 10 videoIds from MongoDB
- ✅ Enriches data with YouTube Data API (title, channel, duration, thumbnail)
- ✅ Displays video list in React Native app
- ✅ Tap on a video → play inside app via WebView
- ✅ Navigates between list and player screen
- ✅ Handles loading states gracefully
- ✅ Orientation Toggle (Portrait/Landscape)

---

## 💡 Thoughtful Technical Decisions

- WebView Instead of Native Player:
Due to Expo Go’s limitations with native dependencies, we used a WebView to embed YouTube videos, ensuring smooth in-app playback without ejecting from Expo.

- Metadata from YouTube API Only:
The MongoDB collection only stores raw videoIds. Metadata (title, channel, thumbnail, etc.) is always fetched fresh from the official YouTube Data API, ensuring consistency.

- Lightweight Stack:
The app avoids unnecessary libraries and sticks to essentials, making it performant and beginner-friendly.
