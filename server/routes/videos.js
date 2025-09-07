const express = require('express');
const axios = require('axios');
const Video = require('../models/Video');
const router = express.Router();
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Helper to fetch metadata
async function fetchVideoMetadata(videoIds) {
  const ids = videoIds.join(',');
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(url);
  
  return response.data.items.map(item => ({
    videoId: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration
  }));
}

// Route: GET /videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({}, 'videoId'); // only fetch videoIds
    const videoIds = videos.map(v => v.videoId);

    if (videoIds.length === 0) {
      return res.status(404).json({ message: 'No videos found' });
    }

    const enrichedData = await fetchVideoMetadata(videoIds);
    res.json(enrichedData);

  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
