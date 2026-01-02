import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

import { GraduationCap, Award, MapPin, ArrowUpRight, Crown, Calendar } from 'lucide-react';

// Gold/Amber Theme configuration
const THEMES = [
    {
        id: 'theme-gold',
        bgGradient: 'from-amber-900/40 via-yellow-900/40 to-black',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/20',
        glow: 'shadow-[0_0_30px_rgba(245,158,11,0.1)]'
    },
    {
        id: 'theme-yellow',
        bgGradient: 'from-yellow-900/40 via-orange-900/40 to-black',
        accentColor: 'text-yellow-400',
        borderColor: 'border-yellow-500/20',
        glow: 'shadow-[0_0_30px_rgba(234,179,8,0.1)]'
    }
];

const EducationView = ({ education = [] }) => {
    const [activeId, setActiveId] = useState(null);
    const safeDisplayItems = Array.isArray(education) ? education : [];

    if (safeDisplayItems.length === 0) {
        return <div className="pt-32 text-center text-white">No education data available</div>;
    }

    return (
        <div className="w-full min-h-screen py-32 px-4 md:px-20 flex flex-col gap-4 relative z-10">
            {/* Header */}
            <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                    Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600">History</span>
                </h2>
            </div>

            {/* The Deck Container */}
            <div className="flex flex-col gap-4 min-h-[600px]">
                {safeDisplayItems.map((item, index) => {
                    const isActive = activeId === item.id;
                    const theme = THEMES[index % THEMES.length];
                    const isDegree = item.title.toLowerCase().includes('bachelor') || item.title.toLowerCase().includes('degree');

                    // Vertical Stack Logic
                    const flexClass = activeId === null
                        ? 'flex-1 opacity-90 hover:opacity-100 hover:flex-[1.2]'
                        : isActive
                            ? 'flex-[5] opacity-100'
                            : 'flex-[0.5] opacity-40 hover:opacity-60';

                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveId(isActive ? null : item.id)}
                            className={`
                                relative rounded-2xl overflow-hidden cursor-pointer
                                transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
                                ${flexClass}
                                ${isActive ? `bg-gradient-to-br ${theme.bgGradient} shadow-[0_0_40px_-5px_rgba(245,158,11,0.2)]` : 'bg-white/5 backdrop-blur-3xl backdrop-saturate-150'}
                                border ${isActive ? 'border-amber-500/30' : 'border-white/5 hover:border-amber-500/30'}
                                ${isActive ? theme.borderColor : ''}
                                ${!isActive ? `hover:scale-[1.01] hover:${theme.glow} shadow-[0_4px_30px_rgba(0,0,0,0.1)] group` : ''}
                            `}
                        >


                            {/* --- INACTIVE STATE (COLLAPSED) --- */}
                            {!isActive && (
                                <div className="absolute inset-0 flex items-center justify-center group overflow-hidden">
                                    {/* Color Reveal Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />

                                    {/* Giant Watermark Icon */}
                                    <div className={`absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 scale-150 rotate-12 ${theme.accentColor}`}>
                                        {isDegree ? <GraduationCap size={200} /> : <Award size={200} />}
                                    </div>

                                    <div className="flex flex-col items-center gap-2 text-center relative z-10">
                                        {/* Icon Badge */}
                                        <div className={`
                                            p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm 
                                            ${theme.accentColor} mb-2 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-xl mt-5
                                        `}>
                                            {isDegree ? <GraduationCap className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                                        </div>

                                        {/* Degree Title */}
                                        <motion.span
                                            layoutId={`degree-${item.id}`}
                                            className={`text-2xl md:text-5xl font-black text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-tight`}
                                            transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                        >
                                            {item.title}
                                        </motion.span>



                                        {/* Organization & Year - Hidden by default, reveals on hover */}
                                        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className={`text-sm md:text-base font-bold ${theme.accentColor} uppercase tracking-widest`}>
                                                {item.organization}
                                            </span>
                                            <span className="text-xs text-gray-500 font-mono">
                                                Class of {item.dates.split(' ').pop()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gradient Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]" />
                                    </div>
                                </div>
                            )}

                            {/* --- ACTIVE STATE (EXPANDED) --- */}
                            <div className={`
                                absolute inset-0 p-6 md:p-12 flex flex-col justify-between overflow-hidden
                                transition-all duration-700
                                ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none'}
                            `}>
                                {/* Background Giant Text Faded */}
                                <div className="absolute -right-4 -top-10 text-[10rem] md:text-[15rem] font-black text-amber-500 opacity-[0.03] leading-none pointer-events-none select-none truncate max-w-full">
                                    {item.dates.split(' ')[0]}
                                </div>

                                {/* Top Content */}
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 ${theme.accentColor} font-bold text-xs uppercase tracking-widest`}>
                                            <Calendar className="w-3 h-3" />
                                            {item.dates}
                                        </div>

                                        {isActive && (
                                            <motion.h2
                                                layoutId={`degree-${item.id}`}
                                                className="text-3xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-3"
                                                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                            >
                                                {item.title}
                                            </motion.h2>
                                        )}


                                        <div className={`text-xl md:text-2xl font-bold ${theme.accentColor} flex items-center gap-3`}>
                                            <Crown className="w-5 h-5" />
                                            {item.organization}
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className={`w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 ${theme.accentColor} group-hover:bg-amber-500/20 transition-colors`}>
                                            <ArrowUpRight className="w-7 h-7" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Content */}
                                <div className="relative z-10 grid md:grid-cols-[1.5fr_1fr] gap-12 items-end">
                                    {/* Description */}
                                    <div>
                                        <p className="text-lg text-gray-300 font-light leading-relaxed mb-8 border-l-4 border-amber-500/20 pl-6">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                                            <MapPin className="w-4 h-4 text-amber-500/50" />
                                            <span>On-site</span>
                                        </div>
                                    </div>

                                    {/* Tags/Details */}
                                    <div>
                                        {item.details && (
                                            <div className="flex flex-wrap justify-end gap-2">
                                                {item.details.map((detail, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-4 py-2 bg-amber-900/10 hover:bg-amber-900/20 border border-amber-500/10 rounded-lg text-sm text-gray-300 transition-colors cursor-default"
                                                    >
                                                        {detail}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Overlay Gradient for Depth */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EducationView;
