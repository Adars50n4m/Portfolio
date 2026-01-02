import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

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
            {/* Background Video with Gradient Mask */}
            <div className="absolute inset-0 w-full h-full overflow-hidden mask-gradient-bottom">
                <video
                    src={videoSource}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-bottom opacity-50"
                />

                {/* Vignette Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent opacity-80" />
            </div>

            <style jsx>{`
                .mask-gradient-bottom {
                    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                }
            `}</style>

            {/* Content Info */}
            <div className="absolute bottom-12 left-6 right-6 md:right-auto md:bottom-auto md:top-[50%] md:left-[60px] md:w-1/2 z-10 text-white pr-0 md:pr-0">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={variants}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-2xl">
                        ADARSH THAKUR
                        <span className="block text-xl sm:text-2xl md:text-3xl font-normal tracking-normal text-red-600 mt-2 md:mt-0">Video Editor & Graphic Designer</span>
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
