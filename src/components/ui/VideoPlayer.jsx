import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const [loadError, setLoadError] = React.useState(false);

    // Reset error state when video changes
    useEffect(() => {
        setLoadError(false);
    }, [video]);

    // Auto-play when mounted
    useEffect(() => {
        if (videoRef.current && !loadError) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }

        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loadError]);

    if (!video) return null;

    // Construct path (similar to VideoCard logic)
    // Construct path (check for remote URL first)
    const isUrl = video.file && (video.file.startsWith('http') || video.file.startsWith('//'));
    const videoPath = isUrl
        ? video.file
        : (video.file && video.folder ? `/videos/Clips/${video.folder}/${video.file}` : '');

    // Fallback if no video path or external link logic needed later
    const hasVideo = !!videoPath && !loadError;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X size={32} />
            </button>

            {/* Video Container */}
            <div className="w-full h-full relative flex items-center justify-center">
                {hasVideo ? (
                    <video
                        ref={videoRef}
                        src={videoPath}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        poster={video.thumbnail}
                        onError={() => setLoadError(true)}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white space-y-4 p-8 text-center bg-black/90 w-full">
                        {video.thumbnail ? (
                            <img
                                src={video.thumbnail}
                                alt="Poster"
                                className="w-full max-w-4xl h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="text-gray-500">No Preview Available</div>
                        )}

                        <div className="absolute bottom-10 left-0 right-0 text-center">
                            <p className="text-xl text-red-400 font-semibold mb-2">Video Playback Unavailable</p>
                            <p className="text-gray-400 text-sm max-w-md mx-auto">
                                The video file could not be loaded. Showing preview thumbnail instead.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default VideoPlayer;
