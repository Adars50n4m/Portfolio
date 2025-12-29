import dbConnect from '../lib/dbConnect.js';
import Video from '../server/models/Video.js';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const videos = await Video.find({}).sort({ order: 1 });
            return res.status(200).json(videos);
        } catch (err) {
            console.error("Error fetching videos:", err);
            return res.status(500).json({ message: 'Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
