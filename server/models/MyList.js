import mongoose from 'mongoose';

const myListSchema = new mongoose.Schema({
    // Using a fixed ID for the global list as per requirement ("My List" same for all)
    // In a real multi-user app, this would be a User ID.
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

export default mongoose.model('MyList', myListSchema);
