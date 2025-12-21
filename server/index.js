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
const vimeoClient = new Vimeo('placeholder_id', 'placeholder_secret', VIMEO_ACCESS_TOKEN);

app.post('/api/admin/migrate-vimeo', async (req, res) => {
    console.log('Starting Vimeo Migration...');
    try {
        const videos = await Video.find({ vimeoId: { $exists: false } });
        let initiated = 0;

        // Process in background to avoid timeout
        (async () => {
            for (const video of videos) {
                if (!video.file || !video.file.startsWith('https://')) continue;

                console.log(`Processing: ${video.title}`);

                vimeoClient.request({
                    method: 'POST',
                    path: '/me/videos',
                    query: {
                        upload: { approach: 'pull', link: video.file },
                        name: video.title,
                        description: video.category
                    }
                }, async (error, body, statusCode) => {
                    if (!error && (statusCode === 200 || statusCode === 201)) {
                        video.vimeoId = body.uri; // e.g., /videos/12345
                        await video.save();
                        console.log(`Migrated: ${video.title} -> ${body.uri}`);
                    } else {
                        console.error(`Failed: ${video.title}`, error);
                    }
                });

                // Small delay to prevent rate limit
                await new Promise(r => setTimeout(r, 1000));
            }
        })();

        res.json({ message: `Migration started for ${videos.length} videos. check logs.` });
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
