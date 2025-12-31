export function withCDN(data) {
    const R2_DOMAIN = process.env.R2_PUBLIC_DOMAIN || 'https://pub-edb0dfe680944457a6f4daab89bcf28f.r2.dev';

    // Safety check
    if (!data) return data;

    // Handle single object or array
    const isArray = Array.isArray(data);
    const list = isArray ? data : [data];

    const processed = list.map(item => {
        if (!item) return item;

        // Handle Mongoose Document (convert to object) or plain object
        // Use shallow clone to avoid mutating original if needed, though usually safe here
        let videoObj = (typeof item.toObject === 'function') ? item.toObject() : { ...item };

        // Apply Logic
        if (R2_DOMAIN && videoObj.file && typeof videoObj.file === 'string' && !videoObj.file.startsWith('http')) {
            // Remove leading slash if present
            const relativePath = videoObj.file.startsWith('/') ? videoObj.file.slice(1) : videoObj.file;
            videoObj.file = `${R2_DOMAIN}/${relativePath}`;
        }
        return videoObj;
    });

    return isArray ? processed : processed[0];
}
