import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
    // Using one of the Bihar videos as the hero background
    const heroVideo = "/videos/Clips/Bihar/Bihar Scene 2.mp4";

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2, // Stagger effect
                duration: 0.8,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="relative w-full h-[65vh] md:h-[80vh] w-full">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    src={heroVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Vignette & Gradient */}
                {/* Left fade - subtle */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
                {/* Bottom fade - pushed strictly to the bottom to keep video clear */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-[#141414]" />
            </div>

            {/* Content Info */}
            <div className="absolute top-[30%] left-[4%] md:left-[60px] w-full md:w-1/3 z-10 text-white">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={variants}
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-2xl">
                        BIHAR
                        <span className="block text-2xl md:text-3xl font-normal tracking-normal text-red-600">The Heritage</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={variants}
                    className="text-base md:text-lg mb-8 drop-shadow-md text-gray-200 line-clamp-3"
                >
                    A journey through the ancient lands of Magadha, exploring the visual history of one of civilization's oldest cradles. Cinematic VFX compositing meets historical storytelling.
                </motion.p>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={variants}
                    className="flex items-center gap-4"
                >
                    <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded hover:bg-white/80 transition-colors font-bold text-lg">
                        <Play fill="black" size={24} /> Play
                    </button>
                    <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 transition-colors font-bold text-lg backdrop-blur">
                        <Info size={24} /> More Info
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
