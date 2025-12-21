import React from 'react';

const GlowingCard = ({ children, className = "", delay = 0 }) => {
    return (
        <div
            className={`relative group bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm ${className}`}
        >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 group-hover:duration-200" />

            {/* Content */}
            <div className="relative h-full bg-neutral-900/80 rounded-xl p-6 ring-1 ring-white/10">
                {children}
            </div>
        </div>
    );
};

export default GlowingCard;
