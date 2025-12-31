import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

// Credentials from User
const ACCOUNT_ID = "89f30de5dacc7b409e4abdae5f99a3a6";
const ACCESS_KEY_ID = "c764a1c554a9af32791b89eae6c7bb6e";
const SECRET_ACCESS_KEY = "8b4bab83207922c51cac62ac1cf8268f319e21533dcb54d4005a803ee9f9ac52";

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

async function main() {
    console.log("Attempting to list buckets...");
    try {
        const data = await S3.send(new ListBucketsCommand({}));
        console.log("Success! Connected to R2.");

        if (data.Buckets && data.Buckets.length > 0) {
            console.log("Buckets found:");
            data.Buckets.forEach((bucket) => {
                console.log(` - ${bucket.Name}`);
            });
        } else {
            console.log("No buckets found. Please create a bucket in Cloudflare R2 dashboard.");
        }
    } catch (err) {
        console.error("Error connecting to R2:", err);
    }
}

main();
