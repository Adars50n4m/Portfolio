import { PutObjectCommand } from "@aws-sdk/client-s3";
import R2, { R2_BUCKET_NAME } from './lib/r2.js';

async function verifyUpload() {
    console.log(`Connecting to R2 Bucket: ${R2_BUCKET_NAME}...`);

    const fileName = 'r2-connection-test.txt';
    const fileContent = 'Hello Cloudflare R2! Connection Verification Successful.';

    try {
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
            ContentType: 'text/plain',
        });

        console.log('Uploading test file...');
        await R2.send(command);
        console.log(`SUCCESS! File '${fileName}' uploaded to '${R2_BUCKET_NAME}'.`);
        console.log(`Verify at: https://pub-<your-custom-domain>/${fileName} (if public access is setup)`);

    } catch (err) {
        console.error("Error uploading to R2:", err);
    }
}

verifyUpload();
