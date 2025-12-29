import dbConnect from './_lib/dbConnect.js';
import MyList from './_models/MyList.js';
import Video from './_models/Video.js';

export default async function handler(req, res) {
    try {
        await dbConnect();

        const feedback = {
            dbStatus: 'Connected',
            models: {
                MyList: !!MyList,
                Video: !!Video
            },
            checks: {}
        };

        // Check 1: Can we read Videos?
        try {
            const videoCount = await Video.countDocuments();
            feedback.checks.videoCount = videoCount;
        } catch (e) {
            feedback.checks.videoError = e.message;
        }

        // Check 2: Can we read MyList?
        try {
            const list = await MyList.findOne({ identifier: 'GLOBAL_USER' });
            feedback.checks.myListFound = !!list;
            feedback.checks.myListItemCount = list ? list.videos.length : 0;
        } catch (e) {
            feedback.checks.myListError = e.message;
        }

        // Check 3: Can we write to MyList?
        if (req.query.tryWrite === 'true') {
            try {
                const list = await MyList.findOneAndUpdate(
                    { identifier: 'GLOBAL_USER' },
                    { $setOnInsert: { videos: [] } }, // Only if doesn't exist
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                );
                feedback.checks.writeTest = "Success";
                feedback.checks.writeResultId = list._id;
            } catch (e) {
                feedback.checks.writeError = e.message;
            }
        }

        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    }
}
