import mongoose from 'mongoose';

const myListSchema = new mongoose.Schema({
    // Using a fixed ID for the global list as per requirement ("My List" same for all)
    identifier: {
        type: String,
        required: true,
        unique: true,
        default: 'GLOBAL_USER'
    },
    videos: [{
        file: String,
        folder: String,
        type: { type: String, default: 'video' },
        title: String,
        thumbnail: String,
        meta: String,
        addedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export default mongoose.models.MyList || mongoose.model('MyList', myListSchema);
