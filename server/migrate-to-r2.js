/* eslint-env node */ /* global process */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import R2, { R2_BUCKET_NAME, R2_PUBLIC_DOMAIN } from './lib/r2.js';
import Video from './models/Video.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        migrateVideos();
    })
    .catch(err => {
        console.error('MongoDB Error:', err);
        process.exit(1);
    });

async function migrateVideos() {
    try {
        const videos = await Video.find({ file: { $not: /^http/ } }); // Find non-http paths
        console.log(`Found ${videos.length} videos to migrate.`);

        for (const video of videos) {
            console.log(`Processing: ${video.title} (${video.file})`);

            // Resolve absolute path
            // video.file usually starts with /videos/..., so remove leading / for path join if needed
            const relativePath = video.file.startsWith('/') ? video.file.slice(1) : video.file;
            const localPath = path.join(__dirname, '../public', relativePath);

            if (!fs.existsSync(localPath)) {
                console.error(`  [SKIP] File not found locally: ${localPath}`);
                continue;
            }

            const fileContent = fs.readFileSync(localPath);
            const fileKey = relativePath; // Maintain folder structure in R2

            // Upload to R2
            console.log(`  Uploading to R2: ${fileKey}...`);
            await R2.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: fileKey,
                Body: fileContent,
                ContentType: 'video/mp4', // Assuming mp4, ideally detect mime type
                ACL: 'public-read' // Just in case, though R2 relies on bucket rules
            }));

            // Construct Public URL
            // Ensure no double slashes
            const domain = R2_PUBLIC_DOMAIN.replace(/\/$/, '');
            const newUrl = `${domain}/${fileKey}`;

            // Update Database
            video.file = newUrl;
            await video.save();
            console.log(`  [DONE] Updated to: ${newUrl}`);
        }

        console.log("Migration Complete! 🎉");
        process.exit(0);

    } catch (err) {
        console.error("Migration Failed:", err);
        process.exit(1);
    }
}

migrateVideos();
