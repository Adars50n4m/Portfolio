import React from 'react';
import { motion } from 'framer-motion';
import NetflixCard from './NetflixCard';
import { PlusCircle } from 'lucide-react';

const MyListView = ({ myList = [], onToggleList, onItemClick, videoVersion }) => {

    if (!myList || myList.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
            >
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <PlusCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Your list is empty</h2>
                <p className="text-gray-400 max-w-md">
                    Add videos to your list to watch them later. They will appear here.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="px-4 md:px-12 pt-24 md:pt-32 pb-20">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            >
                {myList.map((item, index) => (
                    <motion.div
                        key={`${item.file}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <NetflixCard
                            video={item}
                            isAdded={true}
                            onToggleList={onToggleList}
                            onItemClick={onItemClick}
                            videoVersion={videoVersion}
                            className="w-full h-auto aspect-video" // Override fixed width/height for grid
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MyListView;
