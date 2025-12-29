import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Vimeo } from 'vimeo';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DEPLOYMENT_VERSION = '2025-12-25T02:10:00-Mobile-Menu-Hotfix';

console.log(`Starting Server... Version: ${DEPLOYMENT_VERSION}`);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        version: DEPLOYMENT_VERSION,
        environment: process.env.NODE_ENV,
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

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
import MyList from './models/MyList.js';

const VIMEO_ACCESS_TOKEN = 'e4deedd05d3fdaa530fbf3ad51033078';

// --- MY LIST ROUTES ---

// GET: Fetch My List (Global)
app.get('/api/mylist', async (req, res) => {
    try {
        let list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
        if (!list) {
            // Return empty list if not found
            return res.json([]);
        }
        res.json(list.videos);
    } catch (err) {
        console.error("Error fetching My List:", err);
        res.status(500).json({ error: "Failed to fetch list" });
    }
});

// POST: Update My List (Global)
app.post('/api/mylist', async (req, res) => {
    try {
        const { videos } = req.body;
        if (!Array.isArray(videos)) {
            return res.status(400).json({ error: "Videos must be an array" });
        }

        // Update or Create
        const updatedList = await MyList.findOneAndUpdate(
            { identifier: 'GLOBAL_USER' },
            { videos: videos },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(updatedList.videos);
    } catch (err) {
        console.error("Error updating My List:", err);
        res.status(500).json({ error: "Failed to update list" });
    }
});

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
                'Authorization': `Bearer ${VIMEO_ACCESS_TOKEN}`,
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

// Trim Video Endpoint
app.post('/api/trim', async (req, res) => {
    console.log('--- [TRIM] Request Received ---');
    console.log('Body:', req.body);

    const { videoPath, startTime, duration } = req.body;

    try {
        // Convert URL path to Filesystem path
        const relativePath = decodeURIComponent(videoPath).replace(/^\//, '');
        const fullPath = path.join(__dirname, '../public', relativePath);
        console.log('[TRIM] Target File:', fullPath);

        if (!fs.existsSync(fullPath)) {
            console.error('[TRIM] File not found:', fullPath);
            return res.status(404).json({ error: 'Video file not found' });
        }

        const dir = path.dirname(fullPath);
        const ext = path.extname(fullPath);
        const name = path.basename(fullPath, ext);
        const originalPath = path.join(dir, `${name}_original${ext}`);
        console.log('[TRIM] Original Backup:', originalPath);

        // 1. Ensure backup exists (always trim from original)
        if (!fs.existsSync(originalPath)) {
            console.log('[TRIM] Creating backup...');
            fs.copyFileSync(fullPath, originalPath);
        }

        // 2. Trim from Original -> Overwrite Main File
        const tempOutputPath = path.join(dir, `${name}_temp${ext}`);

        console.log('[TRIM] Starting FFmpeg...');
        await new Promise((resolve, reject) => {
            ffmpeg(originalPath)
                .setStartTime(startTime)
                .setDuration(duration)
                .output(tempOutputPath)
                .on('start', (cmd) => console.log('[TRIM] FFmpeg Command:', cmd))
                .on('end', () => {
                    console.log('[TRIM] FFmpeg Complete');
                    resolve();
                })
                .on('error', (err) => {
                    console.error('[TRIM] FFmpeg Error:', err);
                    reject(err);
                })
                .run();
        });

        // 3. Replace main file with trimmed version
        console.log('[TRIM] Replacing main file...');
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        fs.renameSync(tempOutputPath, fullPath);

        console.log(`[TRIM] Success: ${name} trimmed.`);
        res.json({ success: true, message: 'Video trimmed successfully' });

    } catch (err) {
        console.error('[TRIM] Critical Error:', err);
        res.status(500).json({ error: 'Failed to trim video: ' + err.message });
    }
});

// Revert Video Endpoint
app.post('/api/revert', async (req, res) => {
    const { videoPath } = req.body;
    const relativePath = decodeURIComponent(videoPath).replace(/^\//, '');
    const fullPath = path.join(__dirname, '../public', relativePath);

    const dir = path.dirname(fullPath);
    const ext = path.extname(fullPath);
    const name = path.basename(fullPath, ext);
    const originalPath = path.join(dir, `${name}_original${ext}`);

    if (fs.existsSync(originalPath)) {
        // Copy original back to main file
        fs.copyFileSync(originalPath, fullPath);
        console.log(`Reverted ${name} to original`);
        res.json({ success: true, message: 'Video reverted to original' });
    } else {
        res.status(404).json({ error: 'Original backup not found (Video is already original)' });
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
