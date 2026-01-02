import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Play, Volume2, VolumeX } from 'lucide-react';

const VideoCard = ({ project, className = "" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            if (!project.thumbnail) {
                videoRef.current.currentTime = 0;
            }
            // Try playing, handle error if file missing
            videoRef.current.play().catch(() => console.log("Video not found or autoplay blocked"));
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            if (!project.thumbnail && videoRef.current.duration) {
                videoRef.current.currentTime = videoRef.current.duration / 2;
            } else {
                videoRef.current.currentTime = 0;
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <motion.div
            className={`relative group bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden cursor-none ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Video / Thumbnail Container */}
            <div className="absolute inset-0 bg-black">
                {/* Fallback Image (Always rendered behind, visible if video fails or loading) */}
                {project.thumbnail && (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                )}

                {project.videoSrc && (
                    <video
                        ref={videoRef}
                        src={project.videoSrc}
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                        poster={project.thumbnail}
                        onLoadedMetadata={(e) => {
                            if (!project.thumbnail) {
                                e.target.currentTime = e.target.duration / 2;
                            }
                        }}
                        onError={(e) => e.target.style.display = 'none'}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${project.thumbnail ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                            }`}
                    />
                )}

                {!project.videoSrc && !project.thumbnail && (
                    <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-40`} />
                )}
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium tracking-widest uppercase text-white/60 mb-2">{project.category}</p>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={toggleMute}
                    className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Play Icon (Center) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    animate={{ scale: isPlaying ? 0 : 1, opacity: isPlaying ? 0 : 1 }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                    <Play className="w-6 h-6 ml-1 fill-white text-white" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default VideoCard;
