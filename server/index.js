import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Vimeo } from 'vimeo';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
import Video from './models/Video.js';

const VIMEO_ACCESS_TOKEN = 'ea5f0c2dbff1f11f643665a3dab2937ac7aeb826';

app.post('/api/admin/migrate-vimeo', async (req, res) => {
    console.log('Starting Vimeo Migration (Fetch Mode)...');
    try {
        const video = await Video.findOne({ vimeoId: { $exists: false }, file: { $regex: /^https:/ } });

        if (!video) {
            return res.json({ message: 'No eligible videos found for migration.' });
        }

        console.log(`Debug Processing: ${video.title}`);

        const response = await fetch('https://api.vimeo.com/me/videos', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${VIMEO_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.vimeo.*+json;version=3.4'
            },
            body: JSON.stringify({
                upload: {
                    approach: 'pull',
                    link: video.file
                },
                name: video.title,
                description: video.category
            })
        });

        const body = await response.json();

        if (response.ok) {
            video.vimeoId = body.uri; // /videos/123456
            await video.save();
            return res.json({ success: true, migrated: video.title, vimeoUri: body.uri, fullBody: body });
        } else {
            console.error(`Debug Failed: ${video.title}`, body);
            return res.status(response.status).json({ error: 'Vimeo API Error', body: body });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

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
