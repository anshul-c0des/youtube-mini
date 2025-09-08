# 🚀 Tech Stack

- React Native (with Expo)
- React Navigation (stack navigation)
- Axios (API calls)
- React Native WebView (for in-app YouTube playback)
- Expo Go (for fast development/testing)

# 📂 Folder Structure
```bash
client/               # React Native app
  ├── App.js
  ├── screens/
  │   ├── VideoListScreen.js
  │   └── VideoPlayerScreen.js
  └── assets/
```

# 📲 Client Setup (React Native)
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
