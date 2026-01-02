import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const GlassCard = ({ children, className = "", delay = 0, hoverEffect = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            whileHover={hoverEffect ? { scale: 1.02, y: -5 } : {}}
            className={`
                relative overflow-hidden
                backdrop-blur-3xl bg-white/[0.03] 
                border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                rounded-[2.5rem] p-8
                transition-all duration-500
                group
                ${className}
            `}
        >
            {/* Glossy Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Inner Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
