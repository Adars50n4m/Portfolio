const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files (Frontend Production Build)
app.use(express.static(path.join(__dirname, '../dist')));

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Video Routes
const Video = require('./models/Video');

app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ order: 1 });
        res.json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Catch-all route to serve React App for non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
const PORT = process.env.PORT || 8080; // Azure often uses 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
