import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    if (!videos || videos.length === 0) return null;

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
                    {videos.map((vidData, i) => {
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
                    })}
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

const NetflixCard = ({ video: item, isAdded, onToggleList, onItemClick, videoVersion }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);
    const isVideo = item.type === 'video' || !item.type || item.file; // Fallback detection

    // Safe access for video properties
    const isUrl = item.file && (item.file.startsWith('http') || item.file.startsWith('//'));
    let videoPath = isUrl ? item.file : (isVideo && item.file && item.folder ? `/videos/Clips/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.file)}` : '');

    // Append version for cache busting if provided
    if (videoPath && videoVersion) {
        videoPath += `?v=${videoVersion}`;
    }

    const getTitle = (file) => {
        if (!file) return item.title;
        // If it's a URL, get the last part
        const filename = file.split('/').pop();
        return filename.replace('.mp4', '').replace(/_/g, ' ').replace(/%20/g, ' ');
    };

    const videoTitle = isVideo ? getTitle(item.file) : item.title;

    useEffect(() => {
        if (isVideo && videoRef.current) {
            videoRef.current.currentTime = 0.1; // Seek slightly to force frame render
        }
    }, [isVideo]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (isVideo) {
            setTimeout(() => {
                if (videoRef.current) videoRef.current.play().catch(e => { });
            }, 300);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            className="flex-none w-[200px] h-[112px] md:w-[280px] md:h-[157px] relative bg-zinc-800 rounded-sm cursor-pointer transition-all duration-300 group/card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onItemClick && onItemClick(item)}
            initial={{ scale: 1, zIndex: 10, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileHover={{
                scale: 1.3,
                zIndex: 50,
                boxShadow: "0px 10px 40px rgba(255,255,255,0.15)", // Premium White Glow
                transition: { duration: 0.3, delay: 0.1, ease: "easeInOut" } // Smoother ease
            }}
        >
            {/* Base Content */}
            <div className="w-full h-full rounded overflow-hidden relative bg-zinc-800 border-[0.5px] border-white/10 group-hover/card:border-white/40 transition-colors">
                {/* Thumbnail Fallback Layer */}
                {isVideo && item.thumbnail && (
                    <img
                        src={item.thumbnail}
                        alt={item.title || "Video thumbnail"}
                        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 bg-zinc-800"
                    />
                )}

                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={videoPath}
                        className="w-full h-full object-cover relative z-10 hover:opacity-100 transition-opacity duration-300"
                        muted
                        loop={false}
                        preload="metadata"
                        poster={item.thumbnail}
                        onError={(e) => e.target.style.display = 'none'} // Hide if fails
                    />
                ) : (
                    // Resume Card Layout
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-black p-4 flex flex-col justify-center border border-white/10 relative z-20">
                        <h3 className="text-white font-bold text-sm md:text-base line-clamp-2">{item.title}</h3>
                        <p className="text-gray-400 text-xs mt-1 italic">{item.meta}</p>
                        {item.organization && <p className="text-gray-500 text-[10px] mt-1 line-clamp-1">{item.organization}</p>}
                    </div>
                )}
            </div>

            {/* Info Overlay (appears on hover) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-full left-0 w-full bg-[#181818] p-3 shadow-xl rounded-b-md z-[60]"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {isVideo ? (
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                                    <Play size={12} fill="black" />
                                </div>
                            ) : (
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                            )}

                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleList && onToggleList(item); }}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                                title={isAdded ? "Remove from List" : "Add to List"}
                            >
                                {isAdded ? <Check size={12} /> : <Plus size={12} />}
                            </button>

                            <button className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                                <ThumbsUp size={12} />
                            </button>

                            <div className="ml-auto">
                                <button className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                                    <ChevronDown size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-green-500 font-bold text-[10px] md:text-xs">
                                {item.meta || "98% Match"}
                            </span>
                            <span className="border border-white/40 px-1 text-[10px] text-white/60">
                                {isVideo ? 'HD' : 'CV'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1 text-[10px] md:text-xs text-white">
                            <span className="text-white font-semibold line-clamp-1">{videoTitle || item.title}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default ContentRow;
