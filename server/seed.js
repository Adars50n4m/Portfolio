/* eslint-env node */ /* global process */
import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

// Helper to constructing R2 URL
const R2_DOMAIN = "https://pub-edb0dfe680944457a6f4daab89bcf28f.r2.dev";
const getR2Url = (folder, file) => {
    // Encode parts to handle spaces
    const encFolder = folder;
    const encFile = file;
    return `${R2_DOMAIN}/videos/Clips/${encFolder}/${encFile}`;
};

const bengalFamineVideos = [
    { file: getR2Url("Bihar", "Bengal Femine 3.mp4"), folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: getR2Url("Bihar", "Bengal famine 1.mp4"), folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: getR2Url("Bihar", "Bengal famine 2.mp4"), folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: getR2Url("Bihar", "Bengal famine 4.mp4"), folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: getR2Url("Bihar", "Bengal winning.mp4"), folder: "Bihar", type: 'video', category: 'Trending Now' }
];

const ancientBiharVideos = [
    { file: getR2Url("Bihar", "Nalanda Study 2_1.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Nalanda Studying.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Raj Darbar.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Raj mahal scene.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Megasthanise_1.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "sushruta.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Sahitya.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Kala.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Kala 1.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Kala 02.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Ganga nadi.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: getR2Url("Bihar", "Mahal 2.mp4"), folder: "Bihar", type: 'video', category: 'Ancient Heritage' }
];

const britishRajVideos = [
    { file: getR2Url("Bihar", "Angrej ka pehla scene.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 10.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 11.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 13.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 14.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 16.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 2.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 4.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 5.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 6.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 7.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 8.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej 9.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2 Angrej.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: getR2Url("Bihar", "Bihar Scene 2.mp4"), folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' }
];

const russianRevVideos = [
    { file: getR2Url("Lenin Video", "Lenin 1.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Lenin 2.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Lenin and Trotsky Andolan.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "lenin and trotsky.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "lenin and trotsky 3.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Lenini And Trotsky 2.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Trotsky 1.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "communism.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Communism 2.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Tsar 4.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Tsar Palace.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Monster Meeting.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Perceval killed.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Russia 1815.mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Russia 1815 (2).mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: getR2Url("Lenin Video", "Russia 1815(1).mp4"), folder: "Lenin Video", type: 'video', category: 'Revolutionary History' }
];

const financeWarVideos = [
    { file: getR2Url("Lenin Video", "1st Bank of US.mp4"), folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: getR2Url("Lenin Video", "Rothschild Family.mp4"), folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: getR2Url("Lenin Video", "America and Britain War.mp4"), folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: getR2Url("Lenin Video", "Richness.mp4"), folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: getR2Url("Lenin Video", "Gemini_Generated_Image_5z27115z27115z27.mp4"), folder: "Lenin Video", type: 'video', category: 'Economics & War' }
];

const mapsMotionVideos = [
    { file: getR2Url("Bihar", "Bihar Linked Comp 06_1.mp4"), folder: "Bihar", type: 'video', category: 'Maps & Graphics' },
    { file: getR2Url("Bihar", "Bihar Scene 1 Linked Comp 01_2.mp4"), folder: "Bihar", type: 'video', category: 'Maps & Graphics' },
    { file: getR2Url("Bihar", "Bihar Scene 1 Linked Comp 03.mp4"), folder: "Bihar", type: 'video', category: 'Maps & Graphics' }
];

const socialImpactVideos = [
    { file: getR2Url("Slum", "Slum.mp4"), folder: "Slum", type: 'video', category: 'Social Documentaries' }
];

const allVideos = [
    ...bengalFamineVideos,
    ...ancientBiharVideos,
    ...britishRajVideos,
    ...russianRevVideos,
    ...financeWarVideos,
    ...mapsMotionVideos,
    ...socialImpactVideos
];

const seedData = async () => {
    try {
        await Video.deleteMany({}); // Clear existing data
        console.log('Cleared existing videos...');

        await Video.insertMany(allVideos);
        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
