const mongoose = require('mongoose');

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
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
