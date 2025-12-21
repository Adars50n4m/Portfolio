import React from 'react';
import { motion } from 'framer-motion';

const LiquidBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* Orb 1: Blue - Top Left */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px]"
            />

            {/* Orb 2: Purple - Bottom Right */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]"
            />

            {/* Orb 3: Cyan - Center/Floating */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 50, 50, 0],
                    scale: [1, 1.5, 1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[90px]"
            />

            {/* Grain Overlay (Optional for texture) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')] pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};

export default LiquidBackground;
