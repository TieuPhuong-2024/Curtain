const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const curtainRoutes = require('./routes/curtain.routes');
const bannerRoutes = require('./routes/banner.routes');

// Use routes
app.use('/api/curtains', curtainRoutes);
app.use('/api/banners', bannerRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Curtain API');
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/curtainapp';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  }); 