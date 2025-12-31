import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const trackRef = useRef(null);
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

    // Construct path (check for remote URL first)
    const isUrl = video.file && (video.file.startsWith('http') || video.file.startsWith('//'));
    const videoPath = isUrl
        ? video.file
        : (video.file && video.folder ? `/videos/Clips/${video.folder}/${video.file}` : '');

    // Fallback if no video path or external link logic needed later
    const hasVideo = !!videoPath && !loadError;

    const [isEditing, setIsEditing] = React.useState(false);

    const [duration, setDuration] = React.useState(0);
    const [trimStart, setTrimStart] = React.useState(0);
    const [trimEnd, setTrimEnd] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(0); // To force reload video

    const handleTrim = async () => {
        setIsProcessing(true);
        try {
            const finalDuration = trimEnd - trimStart;
            const res = await fetch('http://localhost:8080/api/trim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    videoPath: videoPath,
                    startTime: Number(trimStart),
                    duration: Number(finalDuration)
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('Trim Saved! Reloading...');
                setRefreshKey(prev => prev + 1); // Reload video
                setIsEditing(false);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to server backend.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRevert = async () => {
        // Removed confirm for smoother testing/UX
        // if (!confirm('Revert to original file? This cannot be undone.')) return;

        console.log("Resetting video...");
        setIsProcessing(true);
        try {
            const res = await fetch('http://localhost:8080/api/revert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoPath: videoPath })
            });
            const data = await res.json();
            if (data.success) {
                console.log('Revert success');
                // alert('Reverted to Original!'); // Removed alert to prevent blocking
                setTrimStart(0);
                setRefreshKey(prev => prev + 1);
            } else {
                alert('Error: ' + (data.error || 'Check if original exists'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

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

            {/* Edit Mode Toggle (Admin) */}
            {hasVideo && !isUrl && (
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-6 right-20 z-50 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-full text-white text-sm font-bold transition-colors"
                >
                    {isEditing ? 'Close Edit' : 'Trim / Edit'}
                </button>
            )}

            {/* Video Container */}
            <div className="w-full h-full relative flex items-center justify-center">
                {hasVideo ? (
                    isUrl && videoPath.includes('youtu') ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoPath.split('/').pop().split('?')[0]}?autoplay=1`}
                            className="w-full h-full object-contain"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
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
                            onDurationChange={(e) => {
                                const d = e.currentTarget.duration;
                                setDuration(d);
                                setTrimEnd(d);
                            }}
                            onTimeUpdate={(e) => {
                                // Loop logic for preview
                                if (isEditing && !isDragging) {
                                    if (e.currentTarget.currentTime >= trimEnd) {
                                        e.currentTarget.currentTime = trimStart;
                                    }
                                }
                            }}
                            poster={video.thumbnail}
                            onError={() => setLoadError(true)}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )
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

            {/* Editing Overlay */}
            {isEditing && (
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
            )}
        </motion.div>
    );
};

export default VideoPlayer;
