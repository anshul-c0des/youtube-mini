const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/videos', videoRoutes);

// Ping DB endpoint
app.get('/ping-db', async (req, res) => {
  const state = mongoose.connection.readyState;
  // readyState: 1 means connected
  if(state === 1) {
    res.status(200).json({ message: 'Database connected' });
  } else {
    res.status(503).json({ message: 'Database not connected' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});
