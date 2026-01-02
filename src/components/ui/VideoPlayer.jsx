import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

const VideoPlayer = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const trackRef = useRef(null);
    const [loadError, setLoadError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true); // Initial loading state

    // ... (rest of state hooks)

    // Reset error state and loading when video changes
    useEffect(() => {
        setLoadError(false);
        setIsLoading(true);
    }, [video]);

    // ... (rest of effects)

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

            {/* ... (Edit Mode Toggle - keep as is) ... */}

            {/* Video Container */}
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Skeleton Loading Overlay */}
                {isLoading && !loadError && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900">
                        <Skeleton className="w-full h-full opacity-50" />
                        <div className="absolute text-white/50 text-sm font-light tracking-widest animate-pulse">LOADING...</div>
                    </div>
                )}

                {hasVideo ? (
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
                    ) : (
                        <video
                            key={refreshKey}
                            ref={videoRef}
                            src={`${videoPath}?t=${Date.now()}`}
                            className="w-full h-full object-contain"
                            controls={!isEditing}
                            autoPlay
                            playsInline
                            preload="auto"
                            onWaiting={() => setIsLoading(true)}
                            onCanPlay={() => setIsLoading(false)}
                            onLoadedData={() => setIsLoading(false)}
                            onDurationChange={(e) => {
                                const d = e.currentTarget.duration;
                                setDuration(d);
                                setTrimEnd(d);
                                setIsLoading(false);
                            }}
                            // ... (rest of props)
                            poster={video.thumbnail}
                            onError={() => {
                                setLoadError(true);
                                setIsLoading(false);
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )
                ) : (
                    // ... (Error UI)
                    <div className="flex flex-col items-center justify-center h-full text-white space-y-4 p-8 text-center bg-black/90 w-full">
                        {/* ... (Error content same as before) ... */}
                    </div>
                )}
            </div>

            {/* ... (Editing Overlay) ... */}
        </motion.div>
    );
};
{/* Editing Overlay */ }
{
    isEditing && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900/95 p-6 rounded-2xl border border-white/10 flex flex-col gap-6 z-50 w-[95%] md:w-[700px] shadow-2xl backdrop-blur-xl">
            <div className="flex justify-between items-end">
                <h3 className="text-white font-bold text-lg">Trim Video Mode</h3>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Duration</p>
                    <p className="text-white font-mono font-bold text-xl">{(trimEnd - trimStart).toFixed(1)}s</p>
                </div>
            </div>

            {/* Visual Timeline Slider */}
            <div
                ref={trackRef}
                className="relative h-12 w-full bg-zinc-800 rounded-lg overflow-hidden select-none cursor-pointer"
                onPointerDown={(e) => {
                    if (trackRef.current && !isDragging) {
                        const rect = trackRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percent = Math.max(0, Math.min(x / rect.width, 1));
                        const time = percent * duration;
                        if (videoRef.current) {
                            videoRef.current.currentTime = time;
                            videoRef.current.pause();
                        }
                    }
                }}
            >
                {/* Track Background */}
                <div className="absolute inset-y-0 left-0 bg-gray-600/30 w-full" />

                {/* Active Range (Blue) */}
                <div
                    className="absolute inset-y-0 bg-blue-600/40 border-x-2 border-blue-500 pointer-events-none"
                    style={{
                        left: `${(trimStart / duration) * 100}%`,
                        right: `${100 - (trimEnd / duration) * 100}%`
                    }}
                />

                {/* Left Handle (Start) */}
                <motion.div
                    drag="x"
                    dragMomentum={false}
                    dragElastic={0}
                    dragConstraints={trackRef}
                    onDragStart={() => {
                        setIsDragging(true);
                        if (videoRef.current) videoRef.current.pause();
                    }}
                    onDrag={(event, info) => {
                        if (trackRef.current) {
                            const rect = trackRef.current.getBoundingClientRect();
                            const x = info.point.x - rect.left;
                            const percent = Math.max(0, Math.min(x / rect.width, 1));
                            const time = percent * duration;
                            if (time < trimEnd - 0.5) {
                                setTrimStart(time);
                                if (videoRef.current) videoRef.current.currentTime = time;
                            }
                        }
                    }}
                    onDragEnd={() => {
                        setIsDragging(false);
                        if (videoRef.current) videoRef.current.play();
                    }}
                    className="absolute top-0 bottom-0 w-6 bg-white cursor-ew-resize flex items-center justify-center shadow-lg z-20 group"
                    style={{ left: `${(trimStart / duration) * 100}%`, x: '-50%' }}
                >
                    <div className="w-1 h-6 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors" />
                    <div className="absolute -top-8 px-2 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {trimStart.toFixed(1)}s
                    </div>
                </motion.div>

                {/* Right Handle (End) */}
                <motion.div
                    drag="x"
                    dragMomentum={false}
                    dragElastic={0}
                    dragConstraints={trackRef}
                    onDragStart={() => {
                        setIsDragging(true);
                        if (videoRef.current) videoRef.current.pause();
                    }}
                    onDrag={(event, info) => {
                        if (trackRef.current) {
                            const rect = trackRef.current.getBoundingClientRect();
                            const x = info.point.x - rect.left;
                            const percent = Math.max(0, Math.min(x / rect.width, 1));
                            const time = percent * duration;
                            if (time > trimStart + 0.5) {
                                setTrimEnd(time);
                                if (videoRef.current) videoRef.current.currentTime = time;
                            }
                        }
                    }}
                    onDragEnd={() => {
                        setIsDragging(false);
                        if (videoRef.current) {
                            videoRef.current.currentTime = trimStart;
                            videoRef.current.play();
                        }
                    }}
                    className="absolute top-0 bottom-0 w-6 bg-white cursor-ew-resize flex items-center justify-center shadow-lg z-20 group"
                    style={{ left: `${(trimEnd / duration) * 100}%`, x: '-50%' }}
                >
                    <div className="w-1 h-6 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors" />
                    <div className="absolute -top-8 px-2 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {trimEnd.toFixed(1)}s
                    </div>
                </motion.div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleTrim}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex-1 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {isProcessing ? 'Processing...' : '✅ Save Trim'}
                </button>
                <button
                    onClick={handleRevert}
                    disabled={isProcessing}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex-1 disabled:opacity-50 transition-all"
                >
                    ↺ Reset
                </button>
            </div>
        </div>
    )
}
        </motion.div >
    );
};

export default VideoPlayer;
