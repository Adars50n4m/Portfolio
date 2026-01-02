import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Skeleton from './Skeleton';

const VideoPlayer = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const [loadError, setLoadError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true); // Initial loading state

    // Reset error state and loading when video changes (Handled by key prop in parent)

    // Auto-play when mounted
    useEffect(() => {
        if (videoRef.current && !loadError) {
            videoRef.current.play().catch(() => {
                // Autoplay prevented
            });
        }
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loadError]);

    if (!video) return null;

    // Construct path
    const isUrl = video.file && (video.file.startsWith('http') || video.file.startsWith('//'));
    const videoPath = isUrl
        ? video.file
        : (video.file && video.folder ? `/videos/Clips/${video.folder}/${video.file}` : '');

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
                style={{ zIndex: 300 }}
            >
                <X size={32} />
            </button>

            {/* Video Container */}
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Skeleton Loading Overlay */}
                {isLoading && !loadError && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900">
                        <Skeleton className="w-full h-full opacity-50" />
                        <div className="absolute text-white/50 text-sm font-light tracking-widest animate-pulse">LOADING...</div>
                    </div>
                )}

                {hasVideo || video.vimeoId ? (
                    isUrl && videoPath.includes('youtu') ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoPath.split('/').pop().split('?')[0]}?autoplay=1`}
                            className="w-full h-full object-contain"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                            onLoad={() => setIsLoading(false)}
                        />
                    ) : hasVideo ? (
                        <video
                            ref={videoRef}
                            src={videoPath}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                            playsInline
                            preload="auto"
                            onWaiting={() => setIsLoading(true)}
                            onCanPlay={() => setIsLoading(false)}
                            onLoadedData={() => setIsLoading(false)}
                            poster={video.thumbnail}
                            onError={() => {
                                setLoadError(true);
                                setIsLoading(false);
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : video.vimeoId ? (
                        <iframe
                            src={`https://player.vimeo.com/video/${video.vimeoId.replace('/videos/', '')}?autoplay=1&title=0&byline=0&portrait=0`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                            onLoad={() => setIsLoading(false)}
                        />
                    ) : null
                ) : (
                    // Error UI
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
        </motion.div >
    );
};

export default VideoPlayer;
