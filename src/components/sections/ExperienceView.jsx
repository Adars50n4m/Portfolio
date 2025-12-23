import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Calendar, ArrowUpRight } from 'lucide-react';

// Dark Theme configuration
const THEMES = [
    {
        id: 'theme-1',
        bgGradient: 'from-neutral-900 via-stone-900 to-black',
        accentColor: 'text-white',
        borderColor: 'border-white/10',
        glow: 'shadow-[0_0_30px_rgba(255,255,255,0.05)]'
    },
    {
        id: 'theme-2',
        bgGradient: 'from-slate-900 via-gray-900 to-black',
        accentColor: 'text-gray-200',
        borderColor: 'border-white/10',
        glow: 'shadow-[0_0_30px_rgba(255,255,255,0.05)]'
    },
    {
        id: 'theme-3',
        bgGradient: 'from-zinc-900 via-neutral-900 to-black',
        accentColor: 'text-white',
        borderColor: 'border-white/10',
        glow: 'shadow-[0_0_30px_rgba(255,255,255,0.05)]'
    }
];

const ExperienceView = ({ experience = [] }) => {
    const [activeId, setActiveId] = useState(null);
    const safeDisplayItems = Array.isArray(experience) ? experience : [];

    if (safeDisplayItems.length === 0) {
        return <div className="pt-32 text-center text-white">No experience data available</div>;
    }

    return (
        <div className="w-full min-h-screen py-32 px-4 md:px-20 flex flex-col gap-4 relative z-10">
            {/* Header */}
            <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                    Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Experience</span>
                </h2>
            </div>

            {/* The Deck Container */}
            <div className="flex flex-col gap-4 min-h-[800px]">
                {safeDisplayItems.map((item, index) => {
                    const isActive = activeId === item.id;
                    const theme = THEMES[index % THEMES.length];

                    // Vertical Stack Logic
                    const flexClass = activeId === null
                        ? 'flex-1 opacity-90 hover:opacity-100 hover:flex-[1.2]'
                        : isActive
                            ? 'flex-[6] opacity-100'
                            : 'flex-[0.5] opacity-40 hover:opacity-60';

                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveId(isActive ? null : item.id)}
                            className={`
                                relative rounded-2xl overflow-hidden cursor-pointer
                                transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
                                ${flexClass}
                                bg-gradient-to-br ${theme.bgGradient}
                                border border-white/5 hover:border-white/20
                                ${isActive ? theme.borderColor : ''}
                                ${!isActive ? 'hover:scale-[1.01]' : ''}
                            `}
                        >
                            {/* --- INACTIVE STATE (COLLAPSED) --- */}
                            {!isActive && (
                                <div className="absolute inset-0 flex items-center px-8 md:px-16 justify-center group">
                                    {/* Center: Company Name */}
                                    <div className="flex flex-col items-center gap-2">
                                        <span className={`text-2xl md:text-5xl font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-tight text-center`}>
                                            {item.organization}
                                        </span>
                                        <div className="w-8 h-1 bg-white/10 group-hover:bg-white/30 rounded-full transition-colors" />
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
                                <div className="absolute -right-4 -top-10 text-[10rem] md:text-[15rem] font-black text-white opacity-[0.02] leading-none pointer-events-none select-none truncate max-w-full">
                                    {item.dates.split(' ')[0]}
                                </div>

                                {/* Top Content */}
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest`}>
                                            <Calendar className="w-3 h-3" />
                                            {item.dates}
                                        </div>

                                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-2">
                                            {item.organization}
                                        </h2>
                                        <div className={`text-2xl md:text-3xl font-bold text-gray-400 flex items-center gap-3`}>
                                            <Briefcase className="w-6 h-6" />
                                            {item.title}
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                                            <ArrowUpRight className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Content */}
                                <div className="relative z-10 grid md:grid-cols-[1.5fr_1fr] gap-12 items-end">
                                    {/* Description */}
                                    <div>
                                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8 border-l-4 border-white/10 pl-6">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>On-site / Hybrid</span>
                                        </div>
                                    </div>

                                    {/* Tags/Details */}
                                    <div>
                                        {item.details && (
                                            <div className="flex flex-wrap justify-end gap-2">
                                                {item.details.map((detail, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm text-gray-400 transition-colors cursor-default"
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

export default ExperienceView;
