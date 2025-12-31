import MyList from './_models/MyList.js';
import Video from './_models/Video.js';
import dbConnect from './_lib/dbConnect.js';
import { withCDN } from './_lib/cdn.js';

export default async function handler(req, res) {
    await dbConnect();

    // 1. Get List Stored IDs/Titles
    const list = await MyList.findOne({ identifier: 'GLOBAL_USER' });

    // 2. Get Fresh Videos
    const titles = list ? list.videos.map(v => v.title) : [];
    const freshVideos = await Video.find({ title: { $in: titles } });

    // 3. Process with CDN
    const processed = withCDN(freshVideos);

    res.json({
        "1_Stored_List_Count": list ? list.videos.length : 0,
        "2_Stored_Titles": titles,
        "3_Fresh_Match_Count": freshVideos.length,
        "4_Sample_Fresh_Item": processed[0] || "None",
        "5_All_Processed": processed
    });
}
