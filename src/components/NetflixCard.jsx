import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Play, Check, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import Skeleton from './ui/Skeleton';

const NetflixCard = ({ video: item, isAdded, onToggleList, onItemClick, videoVersion, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
                if (videoRef.current) videoRef.current.play().catch(() => { });
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
            className={`flex-none w-[200px] h-[112px] md:w-[280px] md:h-[157px] relative bg-zinc-800 rounded-sm cursor-pointer transition-all duration-300 group/card ${className || ''}`}
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

                {/* Custom Skeleton Loader */}
                {isLoading && (
                    <Skeleton className="absolute inset-0 z-20" />
                )}

                {/* Thumbnail Fallback Layer */}
                {isVideo && item.thumbnail && (
                    <img
                        src={item.thumbnail}
                        alt={item.title || "Video thumbnail"}
                        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 bg-zinc-800"
                        onLoad={() => setIsLoading(false)}
                    />
                )}

                {isVideo ? (
                    videoPath && !videoPath.includes('youtu') && !videoPath.includes('vimeo') && (
                        <video
                            ref={videoRef}
                            src={videoPath}
                            className="w-full h-full object-cover relative z-10 hover:opacity-100 transition-opacity duration-300"
                            muted
                            loop={false}
                            preload="metadata"
                            poster={item.thumbnail}
                            onLoadedData={() => !item.thumbnail && setIsLoading(false)} // Clear loader if video loads and no thumb
                            onError={(e) => {
                                e.target.style.display = 'none';
                                setIsLoading(false); // Stop loading on error
                            }}
                        />
                    )
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

export default NetflixCard;
