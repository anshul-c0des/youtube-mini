# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (via MongoDB Atlas + Compass)
- Mongoose
- Axios (YouTube API integration)
- dotenv (for managing API keys)

# 📂 Folder Structure
```bash
server/               # Node.js backend API
  ├── index.js
  ├── models/
  │   └── Video.js
  ├── routes/
  │   └── videos.js
  ├── .env
  └── package.json
```

# 🖥️ Server Setup (Node.js + MongoDB)
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

## 🌱 Seeding MongoDB

- Use MongoDB Compass to manually seed your DB with 10 documents:

```bash
{
  "videoId": "dQw4w9WgXcQ"
}
```
Each document should only include the videoId. The server will fetch metadata via the YouTube API when /videos is called.
