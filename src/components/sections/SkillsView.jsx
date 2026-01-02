import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// --- REAL LOGOS (Recreated via SVG) ---
const Icons = {
    // Adobe Premiere Pro (Pr)
    Pr: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <rect x="5" y="5" width="90" height="90" rx="20" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.1" />
            <text x="50" y="60" textAnchor="middle" fill="currentColor" fontSize="45" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="-2">Pr</text>
        </svg>
    ),

    // Adobe After Effects (Ae)
    Ae: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <rect x="5" y="5" width="90" height="90" rx="20" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.1" />
            <text x="50" y="60" textAnchor="middle" fill="currentColor" fontSize="45" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="-2">Ae</text>
        </svg>
    ),

    // Adobe Illustrator (Ai)
    Ai: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <rect x="5" y="5" width="90" height="90" rx="20" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.1" />
            <text x="50" y="60" textAnchor="middle" fill="currentColor" fontSize="45" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="-2">Ai</text>
        </svg>
    ),

    // Adobe Photoshop (Ps)
    Ps: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <rect x="5" y="5" width="90" height="90" rx="20" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.1" />
            <text x="50" y="60" textAnchor="middle" fill="currentColor" fontSize="45" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="-2">Ps</text>
        </svg>
    ),

    Arrow: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

const SkillsView = ({ skills = [] }) => {
    const [activeId, setActiveId] = useState(null);

    return (
        <div className="w-full min-h-screen py-20 px-4 md:px-20 flex flex-col gap-4 relative z-10">

            {skills.map((skill) => {
                const isActive = activeId === skill.id;
                const IconComponent = Icons[skill.code] || Icons.Pr;

                // Vertical Stack Logic:
                // If nothing active: all equal height (flex-1)
                // If active: active one expands significantly, others shrink
                const flexClass = activeId === null
                    ? 'flex-1 opacity-90 hover:opacity-100 hover:flex-[1.2]' // Hover expands slightly
                    : isActive
                        ? 'flex-[8] opacity-100' // Increased expansion ratio
                        : 'flex-[0.5] opacity-50 hover:opacity-80';

                return (
                    <div
                        key={skill.id}
                        onClick={() => setActiveId(isActive ? null : skill.id)}
                        className={`
                            relative rounded-2xl overflow-hidden cursor-pointer
                            transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
                            ${flexClass}
                            ${isActive ? `bg-gradient-to-br ${skill.bgGradient} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]` : 'bg-white/5 backdrop-blur-3xl backdrop-saturate-150'}
                            border ${isActive ? 'border-white/20' : 'border-white/5 hover:border-white/10'}
                            ${!isActive ? 'hover:scale-[1.02] hover:bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group' : ''}
                        `}
                    >
                        {/* --- INACTIVE STATE (COLLAPSED) --- */}
                        {!isActive && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center h-full overflow-hidden">
                                {/* Color Reveal Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgGradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />

                                {/* Subtle Background Icon */}
                                <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${skill.textColor} opacity-10 rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0`}>
                                    <IconComponent />
                                </div>

                                {/* Text Container - MORPHING SOURCE */}
                                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
                                    <motion.h2
                                        layoutId={`title-${skill.id}`}
                                        className={`text-2xl md:text-5xl font-bold font-display tracking-widest uppercase vertical-text text-white/40 group-hover:text-white drop-shadow-lg`}
                                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                    >
                                        {skill.name}
                                    </motion.h2>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>

                                {/* Hover Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]" />
                                </div>
                            </div>
                        )}

                        {/* --- ACTIVE STATE (EXPANDED) --- */}
                        <div className={`
                            absolute inset-0 p-6 md:p-12 flex flex-col justify-between
                            transition-all duration-700
                            ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none'}
                        `}>

                            {/* Top Section */}
                            <div className="flex justify-between items-start relative z-20">
                                <div className={`inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-bold tracking-widest text-black uppercase ${skill.color} rounded-sm`}>
                                    {skill.tagline}
                                </div>
                                {isActive && (
                                    <motion.h1
                                        layoutId={`title-${skill.id}`}
                                        className="text-4xl md:text-8xl font-display text-white uppercase leading-[0.9]"
                                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                    >
                                        {skill.name.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </motion.h1>
                                )}


                                {/* Background Giant Icon Faded */}
                                <div className={`absolute -right-10 -top-10 w-[200px] h-[200px] md:w-[500px] md:h-[500px] ${skill.textColor} opacity-5 pointer-events-none`}>
                                    <IconComponent />
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className="flex flex-col md:flex-row items-end justify-between gap-8 relative z-20">

                                <div className="max-w-md hidden md:block">
                                    <p className="text-lg text-gray-400 font-light leading-relaxed border-l-2 border-white/20 pl-6">
                                        {skill.desc}
                                    </p>
                                </div>

                                {/* Interactive Stats Grid */}
                                <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                                    {(skill.stats || []).map((stat, i) => (
                                        <div key={i} className="flex-1 md:flex-none w-full md:w-24 h-20 md:h-24 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
                                            <span className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</span>
                                            <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
                                        </div>
                                    ))}

                                    {/* Action Button */}
                                    <button className={`hidden md:flex w-24 h-24 rounded-full ${skill.color} items-center justify-center hover:scale-110 transition-transform cursor-pointer text-black`}>
                                        <Icons.Arrow />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Overlay Gradient for Depth */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillsView;
