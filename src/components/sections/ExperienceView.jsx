
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceView = ({ experience = [], onItemClick }) => {

    // Ensure experience is an array
    const safeDisplayItems = Array.isArray(experience) ? experience : [];

    if (safeDisplayItems.length === 0) {
        return <div className="pt-32 text-center text-white">No experience data available</div>;
    }

    return (
        <div className="pt-32 pb-20 px-4 md:px-12 min-h-screen relative z-10">
            <div className="mb-20 text-center">
                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-300 via-blue-100 to-blue-500/80">Journey</span>
                </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* Vertical Timeline Line - Glowing Glass Tube */}
                <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-white/10 to-transparent backdrop-blur-sm md:-translate-x-1/2 rounded-full z-0" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.3 } }
                    }}
                    className="space-y-24"
                >
                    {safeDisplayItems.map((item, index) => {
                        // Alternate left/right alignment for Desktop
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                                }}
                                className={`relative flex flex-col md:flex-row items-stretch gap-8 ${isEven ? 'md:flex-row-reverse' : ''} group`}
                            >
                                {/* Timeline Node (Center) - Glass Orb */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border-4 border-blue-500/30 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all duration-500">
                                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
                                    <Briefcase className="w-6 h-6 text-white relative z-10" />
                                </div>

                                {/* Connective Line to Card */}
                                <div className={`absolute top-8 h-0.5 bg-gradient-to-r from-blue-500/30 to-transparent w-16 md:w-32 transition-all duration-500 group-hover:w-full group-hover:from-blue-400/50
                                    ${isEven ? 'right-1/2 mr-8 origin-right' : 'left-1/2 ml-8 origin-left'}
                                    hidden md:block
                                `} />

                                {/* Spacer */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 text-right' : 'md:pl-16 text-left'} `}>
                                    <div
                                        onClick={() => onItemClick && onItemClick(item)}
                                        className="cursor-pointer group/card h-full perspective-1000"
                                    >
                                        <GlassCard
                                            className={`h-full !rounded-[2.5rem] hover:bg-white/[0.07] border-white/5 group-hover/card:border-blue-500/30 transition-all duration-500 
                                            ${isEven ? 'md:hover:-translate-x-2' : 'md:hover:translate-x-2'}
                                            `}
                                        >
                                            <div className={`flex flex-col h-full ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <span className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                                        <Calendar className="w-3 h-3" />
                                                        {item.dates}
                                                    </span>
                                                </div>

                                                <h3 className="text-4xl font-black text-white mb-2 leading-none tracking-tight group-hover/card:text-blue-200 transition-colors">
                                                    {item.title}
                                                </h3>

                                                <div className={`flex items-center gap-2 mb-6 text-gray-300 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                    <span className="font-semibold text-lg tracking-wide">{item.organization}</span>
                                                </div>

                                                <p className="text-gray-200/90 leading-relaxed mb-6 italic text-lg font-light">
                                                    {item.description}
                                                </p>

                                                {/* Details List */}
                                                {item.details && (
                                                    <ul className="space-y-3 mt-auto bg-black/20 p-6 rounded-2xl border border-white/5 w-full text-left">
                                                        {item.details.map((detail, idx) => (
                                                            <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                                                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                                                <span className="leading-relaxed">{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </GlassCard>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div >
    );
};

export default ExperienceView;
