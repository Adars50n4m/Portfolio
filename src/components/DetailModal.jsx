import React from 'react';
import { X, Play, Plus, ThumbsUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DetailModal = ({ item, onClose, onPlay, onToggleList, isAdded }) => {
    if (!item) return null;

    // Handle background click to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isVideo = item.type === 'video' || !item.type;
    const [liked, setLiked] = React.useState(false);

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[100] bg-black/80 overflow-y-auto backdrop-blur-sm flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-2xl bg-[#181818] rounded-md shadow-2xl overflow-hidden text-white border border-gray-800"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>

                    {/* Content Header / Cover */}
                    {/* We use a static gradient header for text cards, or maybe a placeholder image */}
                    <div className="relative h-64 w-full bg-gradient-to-b from-gray-900 to-[#181818] flex items-end p-8">
                        {/* Optional Background Image if available */}
                        {item.thumbnail && (
                            <img
                                src={item.thumbnail}
                                alt="Cover"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
                            />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />

                        <div className={`absolute inset-0 opacity-40 ${isVideo ? 'bg-red-900' : 'bg-blue-900'} mix-blend-overlay`} />

                        <div className="relative z-20 w-full">
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                                {item.title || (item.file ? item.file.split('/').pop().replace('.mp4', '').replace(/_/g, ' ').replace(/%20/g, ' ') : "Untitled")}
                            </h2>

                            {/* Meta Row */}
                            <div className="flex items-center gap-3 mb-6 text-sm">
                                <span className="text-green-500 font-bold">98% Match</span>
                                <span className="text-gray-300">{item.meta || "Portfolio Item"}</span>
                                {item.dates && <span className="text-gray-400">• {item.dates}</span>}
                                {item.organization && <span className="text-gray-400">• {item.organization}</span>}
                            </div>

                            <div className="flex items-center gap-3">
                                {isVideo ? (
                                    <button
                                        onClick={() => onPlay && onPlay(item)}
                                        className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                                    >
                                        <Play size={20} fill="black" />
                                        <span>Play</span>
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors cursor-default">
                                        <span>View Details</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => onToggleList && onToggleList(item)}
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${isAdded ? 'border-white text-white bg-white/10' : 'border-gray-500 text-gray-400 hover:border-white hover:text-white'}`}
                                    title={isAdded ? "Remove from List" : "Add to List"}
                                >
                                    {isAdded ? <Check size={20} /> : <Plus size={20} />}
                                </button>

                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${liked ? 'border-white text-white' : 'border-gray-500 text-gray-400 hover:border-white hover:text-white'}`}
                                >
                                    <ThumbsUp size={20} fill={liked ? "white" : "none"} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-8 grid md:grid-cols-3 gap-8 bg-[#181818]">
                        <div className="md:col-span-2">
                            <p className="text-lg leading-relaxed text-gray-200 mb-6">
                                {item.description || "This project was crafted using a multi-step creative workflow. Base imagery was generated using AI, followed by precise layer separation in Photoshop. The final scene was brought to life in Adobe After Effects using 3D Camera and Puppet Tool styling for a cinematic 2.5D parallax effect."}
                            </p>
                        </div>

                        <div className="text-sm text-gray-400 space-y-3">
                            <div>
                                <span className="text-gray-500 block mb-1">Type</span>
                                <span className="text-gray-200">{item.type === 'card' ? 'Resume Item' : 'Video Project'}</span>
                            </div>
                            {item.organization && (
                                <div>
                                    <span className="text-gray-500 block mb-1">Organization</span>
                                    <span className="text-gray-200">{item.organization}</span>
                                </div>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DetailModal;
