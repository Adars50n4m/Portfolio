import dbConnect from '../lib/dbConnect.js';
import MyList from '../server/models/MyList.js';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            let list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
            if (!list) {
                return res.status(200).json([]);
            }
            return res.status(200).json(list.videos);
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

            return res.status(200).json(updatedList.videos);
        } catch (err) {
            console.error("Error updating My List:", err);
            return res.status(500).json({ error: "Failed to update list" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
