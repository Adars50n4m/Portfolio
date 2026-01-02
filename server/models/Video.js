import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    file: {
        type: String,
        required: true
    },
    folder: {
        type: String,
        default: 'General'
    },
    type: {
        type: String,
        enum: ['video', 'card'],
        default: 'video'
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    meta: {
        type: String
    },
    category: {
        type: String,
        required: true, // e.g., 'Bengal Famine', 'Russian Revolution'
        index: true
    },
    order: {
        type: Number,
        default: 0
    },
    vimeoId: {
        type: String // Stores the Vimeo URI (e.g., "/videos/12345678")
    }
}, { timestamps: true });

export default mongoose.models.Video || mongoose.model('Video', videoSchema);
