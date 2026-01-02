
/* eslint-env node */ /* global process */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Vimeo } from 'vimeo';
import Video from './models/Video.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
// Using the token provided by user
const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;
// Client ID and Secret are not strictly required for authenticated uploads if we have a valid token, 
// but the library might expect them. Often we can pass placeholders if the token is valid.
const VIMEO_CLIENT_ID = 'placeholder_id';
const VIMEO_CLIENT_SECRET = 'placeholder_secret';

const client = new Vimeo(VIMEO_CLIENT_ID, VIMEO_CLIENT_SECRET, VIMEO_ACCESS_TOKEN);

const uploadVideoToVimeo = async (video) => {
    return new Promise((resolve) => {
        console.log(`Starting upload for: ${video.title} (${video.file})`);

        // Use "pull" upload approach
        client.request({
            method: 'POST',
            path: '/me/videos',
            query: {
                upload: {
                    approach: 'pull',
                    link: video.file // The direct Azure Blob URL
                },
                name: video.title,
                description: video.meta || `Category: ${video.category}`
            }
        }, (error, body, statusCode) => {
            if (error) {
                console.error(`Error uploading ${video.title}:`, error);
                return resolve(null); // Resolve null to continue loop
            }

            if (statusCode === 201 || statusCode === 200) {
                console.log(`Successfully triggered upload for ${video.title}. URI: ${body.uri}`);
                resolve(body.uri); // Returns "/videos/12345678"
            } else {
                console.error(`Failed to upload ${video.title}. Status: ${statusCode}`, body);
                resolve(null);
            }
        });
    });
};

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');
        const videos = await Video.find({ vimeoId: { $exists: false } }); // Only process unprocessed videos

        console.log(`Found ${videos.length} videos to migrate.`);

        for (const video of videos) {
            if (!video.file || !video.file.startsWith('http')) {
                console.log(`Skipping invalid file: ${video.title}`);
                continue;
            }

            const vimeoUri = await uploadVideoToVimeo(video);

            if (vimeoUri) {
                video.vimeoId = vimeoUri;
                await video.save();
                console.log(`Saved Vimeo ID for ${video.title}`);
            }

            // formatting spacing
            console.log('---');
        }

        console.log('Migration batch complete.');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
