import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Vimeo } from 'vimeo';
// import ffmpeg from 'fluent-ffmpeg';
// import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';

// ffmpeg.setFfmpegPath(ffmpegPath);

dotenv.config();

// Handle __dirname and __filename in ES Modules and Bundled Environments
let __dirname;
try {
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    const __filename = fileURLToPath(import.meta.url);
    __dirname = dirname(__filename);
} catch (e) {
    // Fallback for CommonJS or Bundled environments where import.meta is undefined
    __dirname = process.cwd();
}

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
const MONGO_URI = process.env.MONGO_URI || process.env.NETLIFY_DATABASE_URL;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Connect initially (optional, but good for warm starts)
connectDB();

// Ensure DB is connected for every request (Serverless best practice)
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
    }
    next();
});

// Video Routes
import Video from './models/Video.js';
import MyList from './models/MyList.js';

const VIMEO_ACCESS_TOKEN = 'e4deedd05d3fdaa530fbf3ad51033078';

// --- R2 STORAGE ROUTES ---
import { generateUploadUrl } from './lib/r2.js';
import { withCDN } from '../api/_lib/cdn.js';

app.post('/api/r2/upload-url', async (req, res) => {
    try {
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).json({ error: 'fileName and fileType are required' });
        }

        const { url, key } = await generateUploadUrl(fileName, fileType);
        res.json({ url, key });
    } catch (err) {
        console.error('Error generating R2 upload URL:', err);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

// --- MY LIST ROUTES ---

// GET: Fetch My List (Global)
app.get('/api/mylist', async (req, res) => {
    try {
        let list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
        if (!list) {
            // Return empty list if not found
            return res.json([]);
        }
        res.json(withCDN(list.videos));
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

        res.json(withCDN(updatedList.videos));
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

        res.json(withCDN(videos));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Trim/Revert Endpoints Removed for Netlify Compatibility

// Catch-all route to serve React App for non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// --- R2 STORAGE ROUTES ---
import { generateUploadUrl } from './lib/r2.js';
import { withCDN } from '../api/_lib/cdn.js';

app.post('/api/r2/upload-url', async (req, res) => {
    try {
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).json({ error: 'fileName and fileType are required' });
        }

        const { url, key } = await generateUploadUrl(fileName, fileType);
        res.json({ url, key });
    } catch (err) {
        console.error('Error generating R2 upload URL:', err);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start Server
const PORT = process.env.PORT || 8080;
// Only listen if not running in serverless (Netlify Functions exports app, doesn't listen directly)
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
