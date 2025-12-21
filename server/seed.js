const mongoose = require('mongoose');
const Video = require('./models/Video');
require('dotenv').config();

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

const bengalFamineVideos = [
    { file: "Bengal Femine 3.mp4", folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: "Bengal famine 1.mp4", folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: "Bengal famine 2.mp4", folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: "Bengal famine 4.mp4", folder: "Bihar", type: 'video', category: 'Trending Now' },
    { file: "Bengal winning.mp4", folder: "Bihar", type: 'video', category: 'Trending Now' }
];

const ancientBiharVideos = [
    { file: "Nalanda Study 2_1.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Nalanda Studying.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Raj Darbar.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Raj mahal scene.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Megasthanise_1.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "sushruta.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Sahitya.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Kala.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Kala 1.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Kala 02.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Ganga nadi.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' },
    { file: "Mahal 2.mp4", folder: "Bihar", type: 'video', category: 'Ancient Heritage' }
];

const britishRajVideos = [
    { file: "Angrej ka pehla scene.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 10.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 11.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 13.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 14.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 16.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 2.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 4.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 5.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 6.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 7.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 8.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej 9.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2 Angrej.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' },
    { file: "Bihar Scene 2.mp4", folder: "Bihar", type: 'video', category: 'The British Raj Limited Series' }
];

const russianRevVideos = [
    { file: "Lenin 1.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Lenin 2.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Lenin and Trotsky Andolan.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "lenin and trotsky.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "lenin and trotsky 3.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Lenini And Trotsky 2.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Trotsky 1.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "communism.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Communism 2.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Tsar 4.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Tsar Palace.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Monster Meeting.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Perceval killed.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Russia 1815.mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Russia 1815 (2).mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' },
    { file: "Russia 1815(1).mp4", folder: "Lenin Video", type: 'video', category: 'Revolutionary History' }
];

const financeWarVideos = [
    { file: "1st Bank of US.mp4", folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: "Rothschild Family.mp4", folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: "America and Britain War.mp4", folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: "Richness.mp4", folder: "Lenin Video", type: 'video', category: 'Economics & War' },
    { file: "Gemini_Generated_Image_5z27115z27115z27.mp4", folder: "Lenin Video", type: 'video', category: 'Economics & War' }
];

const mapsMotionVideos = [
    { file: "Bihar Linked Comp 06_1.mp4", folder: "Bihar", type: 'video', category: 'Maps & Graphics' },
    { file: "Bihar Scene 1 Linked Comp 01_2.mp4", folder: "Bihar", type: 'video', category: 'Maps & Graphics' },
    { file: "Bihar Scene 1 Linked Comp 03.mp4", folder: "Bihar", type: 'video', category: 'Maps & Graphics' }
];

const socialImpactVideos = [
    { file: "Slum.mp4", folder: "Slum", type: 'video', category: 'Social Documentaries' }
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
