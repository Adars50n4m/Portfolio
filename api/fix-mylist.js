import dbConnect from './_lib/dbConnect.js';
import MyList from './_models/MyList.js';
import Video from './_models/Video.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    try {
        await dbConnect();

        // 1. Fetch Global List
        const list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
        if (!list || list.videos.length === 0) {
            return res.json({ message: 'List is empty or not found.' });
        }

        // 2. Fetch All Fresh Videos
        const allVideos = await Video.find({});
        const videoMap = new Map(allVideos.map(v => [v.title, v]));

        // 3. Update List Items
        let updatedCount = 0;
        const freshVideos = list.videos.map(item => {
            const fresh = videoMap.get(item.title);
            if (fresh) {
                updatedCount++;
                // Return fresh object (converted to object if needed)
                const freshObj = fresh.toObject();
                // Preserve addedAt if needed, or just overwrite
                return {
                    ...freshObj,
                    addedAt: item.addedAt || new Date()
                };
            }
            return item; // Keep old if no match found (or filter it out?)
        });

        // 4. Save
        list.videos = freshVideos;
        await list.save();

        return res.json({
            success: true,
            message: `Updated ${updatedCount} videos in My List with fresh data.`,
            videos: freshVideos.map(v => v.title)
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
