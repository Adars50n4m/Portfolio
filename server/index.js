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
    console.log('Starting Vimeo Migration (Debug Mode)...');
    try {
        const video = await Video.findOne({ vimeoId: { $exists: false }, file: { $regex: /^https:/ } });

        if (!video) {
            return res.json({ message: 'No eligible videos found for migration.' });
        }

        console.log(`Debug Processing: ${video.title}`);

        vimeoClient.request({
            method: 'POST',
            path: '/me/videos',
            query: {
                upload: { approach: 'pull', link: video.file },
                name: video.title,
                description: video.category
            }
        }, async (error, body, statusCode) => {
            if (error) {
                console.error(`Debug Failed: ${video.title}`, error);
                return res.status(500).json({ error: error, body: body, statusCode: statusCode });
            }

            if (statusCode === 200 || statusCode === 201) {
                video.vimeoId = body.uri;
                await video.save();
                return res.json({ success: true, migrated: video.title, vimeoUri: body.uri, fullBody: body });
            } else {
                return res.status(statusCode).json({ error: 'Vimeo Error', body: body });
            }
        });

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
