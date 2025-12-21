import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Indexing'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const createIndex = async () => {
    try {
        // Explicitly create the index on 'order'
        await Video.collection.createIndex({ order: 1 });
        console.log('Index on "order" field created successfully.');

        // Also ensuring category index exists
        await Video.collection.createIndex({ category: 1 });
        console.log('Index on "category" field created successfully.');

        process.exit();
    } catch (err) {
        console.error('Error creating index:', err);
        process.exit(1);
    }
};

createIndex();
