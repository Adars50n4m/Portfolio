
import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Command, Cpu, Palette, Code, Sparkles } from 'lucide-react';

const SkillsView = ({ skills = [], onItemClick }) => {
    const [filter, setFilter] = useState("All");

    // Extract unique categories
    const categories = ["All", ...new Set(skills.map(s => s.category))];

    const filteredSkills = filter === "All"
        ? skills
        : skills.filter(s => s.category === filter);

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case "Video": return <Layers size={18} />;
            case "Design": return <Palette size={18} />;
            case "AI": return <Sparkles size={18} />;
            case "Tech": return <Code size={18} />;
            default: return <Command size={18} />;
        }
    };

    // Staggered Container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-12 min-h-screen relative z-10">
            <div className="mb-16 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-white/40">Toolbox</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-200/80 text-xl max-w-2xl leading-relaxed backdrop-blur-sm"
                >
                    High-performance creative stack.
                </motion.p>
            </div>

            {/* Filter Tabs - Floating Pills */}
            <div className="flex flex-wrap gap-3 mb-16 justify-center md:justify-start">
                {categories.map((cat, idx) => (
                    <motion.button
                        key={cat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setFilter(cat)}
                        className={`px-8 py-3 rounded-full backdrop-blur-md transition-all duration-300 flex items-center gap-3 font-semibold text-sm tracking-wide border
                        ${filter === cat
                                ? 'bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-black/30 text-white/60 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                            } `}
                    >
                        {cat !== "All" && getCategoryIcon(cat)}
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredSkills.map((skill) => (
                        <motion.div
                            layout
                            variants={{
                                hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 20 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    filter: "blur(0px)",
                                    y: 0,
                                    transition: { duration: 0.5, ease: "easeOut" }
                                }
                            }}
                            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)", transition: { duration: 0.2 } }}
                            key={skill.id}
                            onClick={() => onItemClick && onItemClick(skill)}
                            className={`${onItemClick ? 'cursor-pointer' : ''} group perspective-1000`}
                        >
                            <GlassCard className="h-full items-center text-center !p-6 !rounded-[2rem] hover:bg-white/[0.08] border-white/5 group-hover:border-white/20 transition-all duration-500 group-hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]">
                                <div className="flex flex-col items-center h-full">
                                    {/* Logo Container - Floating & Glowing */}
                                    <div className="w-20 h-20 mb-6 relative transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative w-full h-full bg-black/40 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-white/5 overflow-hidden">
                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            {skill.icon && skill.icon.startsWith('http') ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain drop-shadow-md z-10"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="hidden text-white/50">
                                                <Cpu size={28} />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">{skill.name}</h3>

                                    <div className="mt-auto w-full">
                                        <div className={`h-1 w-full rounded-full bg-white/10 overflow-hidden mb-2`}>
                                            <div className={`h-full rounded-full ${skill.level === 'Expert' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 w-[95%]' :
                                                skill.level === 'Advanced' ? 'bg-gradient-to-r from-blue-400 to-blue-600 w-[80%]' :
                                                    'bg-gradient-to-r from-purple-400 to-purple-600 w-[60%]'
                                                }`} />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest
                                            ${skill.level === 'Expert' ? 'text-emerald-400' :
                                                skill.level === 'Advanced' ? 'text-blue-400' :
                                                    'text-purple-400'
                                            } `}>
                                            {skill.level}
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default SkillsView;

