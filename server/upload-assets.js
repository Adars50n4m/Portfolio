import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import R2, { R2_BUCKET_NAME } from './lib/r2.js';
import mime from 'mime-types'; // need to install this or use simple mapping

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');

async function uploadDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await uploadDirectory(fullPath);
        } else {
            // Calculate relative key (e.g., videos/Clips/file.mp4)
            const relativeKey = path.relative(PUBLIC_DIR, fullPath);

            // Skip system files
            if (file.startsWith('.') || file === 'debug.html') continue;

            console.log(`Uploading: ${relativeKey}...`);

            try {
                const fileContent = fs.readFileSync(fullPath);
                // Simple mime type detection
                const ext = path.extname(fullPath).toLowerCase();
                let contentType = 'application/octet-stream';
                if (ext === '.mp4') contentType = 'video/mp4';
                if (ext === '.png') contentType = 'image/png';
                if (ext === '.jpg') contentType = 'image/jpeg';

                await R2.send(new PutObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: relativeKey,
                    Body: fileContent,
                    ContentType: contentType,
                }));
                console.log(`  ✅ Uploaded`);
            } catch (err) {
                console.error(`  ❌ Failed: ${err.message}`);
            }
        }
    }
}

console.log("Starting bulk upload to R2...");
uploadDirectory(PUBLIC_DIR).then(() => {
    console.log("All uploads complete!");
}).catch(err => {
    console.error("Fatal Error:", err);
});
