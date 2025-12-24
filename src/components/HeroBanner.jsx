import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
    // Video Background
    const videoSource = "/videos/Clips/Hero Banner.mp4";

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
        <div className="relative w-full h-[85vh] md:h-[80vh]">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    src={videoSource}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-bottom"
                />

                {/* Vignette & Gradient */}
                {/* Left fade - subtle */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />

                {/* Mobile Scrim: Stronger, taller bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-[60vh] md:h-48 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 h-12 bg-[#141414]" />
            </div>

            {/* Content Info */}
            <div className="absolute bottom-12 left-6 md:bottom-auto md:top-[50%] md:left-[60px] w-full md:w-1/2 z-10 text-white pr-4 md:pr-0">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={variants}
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-2xl">
                        ADARSH THAKUR
                        <span className="block text-2xl md:text-3xl font-normal tracking-normal text-red-600 mt-2 md:mt-0">Video Editor & Graphic Designer</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={variants}
                    className="text-base md:text-lg mb-8 drop-shadow-md text-gray-200 line-clamp-3 md:line-clamp-none max-w-2xl"
                >
                    Crafting visual stories through high-end video editing and cinematic VFX. A fusion of technical precision and artistic vision, bringing ideas to life with professional post-production and creative direction.
                </motion.p>


            </div>
        </div>
    );
};

export default HeroBanner;
