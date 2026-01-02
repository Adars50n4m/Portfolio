import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import NetflixCard from './NetflixCard';

const ContentRow = ({ title, videos = [], myList = [], onToggleList, onItemClick, videoVersion, numbered = false }) => {
    const rowRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if ((!videos || videos.length === 0) && title !== "My List") return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-30 hover:z-50 transition-all duration-300 overflow-visible my-4 -mb-20 md:-mb-32 pointer-events-none"
        >
            <h2 className="text-[#e5e5e5] font-bold text-lg md:text-2xl mb-2 px-4 md:px-12 hover:text-white transition-colors cursor-pointer inline-block pointer-events-auto">
                {title}
            </h2>

            <div className="group relative pointer-events-auto">
                {/* Left Arrow */}
                <div
                    className={`absolute top-0 bottom-0 left-0 w-12 bg-black/50 z-40 items-center justify-center cursor-pointer hover:bg-black/70 transition-all ${isMoved ? 'flex' : 'hidden'}`}
                    onClick={() => handleClick('left')}
                >
                    <ChevronLeft className="text-white w-8 h-8" />
                </div>

                {/* Scroll User Container */}
                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-scroll scrollbar-hide px-4 md:px-12 scroll-smooth items-center pt-8 md:pt-10 pb-24 md:pb-40"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {(!videos || videos.length === 0) ? (
                        <div className="w-full h-[157px] flex items-center justify-center text-gray-500 text-sm italic">
                            Your list is empty. Add videos to see them here.
                        </div>
                    ) : (
                        videos.map((vidData, i) => {
                            const isAdded = myList.some(v => v.file === vidData.file);

                            if (numbered) {
                                return (
                                    <div key={i} className="flex-none flex items-center relative group/number-card" style={{ width: 'auto', marginRight: '20px' }}>
                                        {/* Large SVG Number */}
                                        <svg
                                            viewBox="0 0 180 157"
                                            className="h-[112px] md:h-[157px] w-[110px] md:w-[180px] -mr-12 md:-mr-20 relative z-0 shrink-0 select-none pointer-events-none transition-all duration-500 ease-out group-hover/number-card:opacity-0 group-hover/number-card:translate-x-4"
                                            style={{ overflow: 'visible' }}
                                        >
                                            <text
                                                x="50%"
                                                y="142"
                                                fill="black"
                                                stroke="#e5e5e5"
                                                strokeWidth="2"
                                                textAnchor="middle"
                                                fontSize="170"
                                                fontWeight="900"
                                                fontFamily="sans-serif"
                                                className="drop-shadow-lg"
                                            >
                                                {i + 1}
                                            </text>
                                        </svg>

                                        <NetflixCard
                                            video={vidData}
                                            isAdded={isAdded}
                                            onToggleList={() => onToggleList(vidData)}
                                            onItemClick={onItemClick}
                                            videoVersion={videoVersion}
                                            className="relative z-10"
                                        />
                                    </div>
                                );
                            }

                            return (
                                <NetflixCard
                                    key={i}
                                    video={vidData}
                                    isAdded={isAdded}
                                    onToggleList={() => onToggleList(vidData)}
                                    onItemClick={onItemClick}
                                    videoVersion={videoVersion}
                                />
                            );
                        })
                    )}
                </div>

                {/* Right Arrow */}
                <div
                    className="absolute top-0 bottom-0 right-0 w-12 bg-black/50 z-40 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                    onClick={() => handleClick('right')}
                >
                    <ChevronRight className="text-white w-8 h-8" />
                </div>
            </div>
        </motion.div>
    );
};

export default ContentRow;
