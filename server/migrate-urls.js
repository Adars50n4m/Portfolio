/* eslint-env node */ /* global process */
import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
}

// Base URL for Azure Blob Storage
// Structure: https://<account>.blob.core.windows.net/<container>/Clips/<folder>/<file>
const BASE_URL = "https://portfoliovideosadarsh.blob.core.windows.net/videos/Clips";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Migration'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const migrateData = async () => {
    try {
        const videos = await Video.find({});
        console.log(`Found ${videos.length} videos to update.`);

        let updatedCount = 0;

        for (const video of videos) {
            // Skip if already an HTTP URL
            if (video.file.startsWith('http')) {
                continue;
            }

            // Encode parts to handle spaces
            const folder = encodeURIComponent(video.folder);
            // Sometimes file might already have path, but based on seed data it's just filename.
            // Let's ensure we don't double encode if not needed, but standard encodeURIComponent is safe for simple filenames.
            // Wait, 'Bengal Femine 3.mp4' -> 'Bengal%20Femine%203.mp4'.
            const file = encodeURIComponent(video.file);

            const newUrl = `${BASE_URL}/${folder}/${file}`;

            video.file = newUrl;
            await video.save();
            updatedCount++;
            console.log(`Updated: ${video.title || video.file} -> ${newUrl}`);
        }

        console.log(`Migration Complete. Updated ${updatedCount} videos.`);
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

migrateData();
