/* eslint-env node */ /* global process */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
dotenv.config();

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});


export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'video';

export async function generateUploadUrl(fileName, fileType) {
    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
    });

    // URL expires in 1 hour (3600 seconds)
    const url = await getSignedUrl(R2, command, { expiresIn: 3600 });
    return { url, key: fileName };
}

export const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || '';

export function getPublicUrl(key) {
    if (!R2_PUBLIC_DOMAIN) return null;
    // Ensure no double slashes if domain ends with /
    const domain = R2_PUBLIC_DOMAIN.replace(/\/$/, '');
    return `${domain}/${key}`;
}

export default R2;
