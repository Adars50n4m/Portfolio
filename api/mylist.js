import dbConnect from './_lib/dbConnect.js';
import MyList from './_models/MyList.js';
import { withCDN } from './_lib/cdn.js';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            let list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
            if (!list) {
                return res.status(200).json([]);
            }

            // Extract titles to fetch fresh data from Video collection
            // This fixes potential stale data (old URLs) in the embedded MyList array
            const titles = list.videos.map(v => v.title);
            const freshVideos = await import('./_models/Video.js').then(m => m.default.find({ title: { $in: titles } }));

            // Map fresh videos to maintain order roughly? Or just return fresh batch.
            // Order might change, but data will be correct.

            res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
            return res.status(200).json(withCDN(freshVideos));
        } catch (err) {
            console.error("Error fetching My List:", err);
            return res.status(500).json({ error: "Failed to fetch list" });
        }
    } else if (req.method === 'POST') {
        try {
            const { videos } = req.body;
            if (!Array.isArray(videos)) {
                return res.status(400).json({ error: "Videos must be an array" });
            }

            const updatedList = await MyList.findOneAndUpdate(
                { identifier: 'GLOBAL_USER' },
                { videos: videos },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );

            return res.status(200).json(withCDN(updatedList.videos));
        } catch (err) {
            console.error("Error updating My List:", err);
            return res.status(500).json({ error: "Failed to update list" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
