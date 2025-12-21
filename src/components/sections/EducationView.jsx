
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationView = ({ education = [], onItemClick }) => {

    // Ensure education is an array
    const safeDisplayItems = Array.isArray(education) ? education : [];

    if (safeDisplayItems.length === 0) {
        return <div className="pt-32 text-center text-white">No education data available</div>;
    }

    return (
        <div className="pt-32 pb-20 px-4 md:px-12 min-h-screen relative z-10">
            <div className="mb-20 text-center md:text-right">
                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-500">Credentials</span>
                </h2>
                <div className="h-1 w-32 bg-yellow-500/50 rounded-full ml-auto mr-4 md:mr-0 animate-pulse" />
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
            >
                {safeDisplayItems.map((item, index) => {
                    const isDegree = item.title.includes('Bachelor') || item.title.includes('Degree');

                    return (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                                visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6 } }
                            }}
                            onClick={() => onItemClick && onItemClick(item)}
                            className="cursor-pointer group perspective-1000"
                        >
                            <GlassCard delay={0} className="h-full !rounded-[2.5rem] border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-yellow-500/20 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                                <div className="flex flex-col h-full relative overflow-hidden">

                                    {/* Abstract Glass Shape */}
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-yellow-500/10 to-transparent blur-[80px] -mr-20 -mt-20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-8 relative z-10">
                                        <div className="items-center justify-center flex w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 text-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform duration-500">
                                            {isDegree ? <GraduationCap className="w-10 h-10" /> : <Award className="w-10 h-10" />}
                                        </div>
                                        <div className="text-yellow-200/80 font-mono text-sm font-bold tracking-widest border border-yellow-500/20 px-4 py-2 rounded-full bg-yellow-500/5 backdrop-blur-md group-hover:bg-yellow-500/10 transition-colors">
                                            {item.dates}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 relative z-10 pl-2">
                                        <h3 className="text-4xl font-black text-white mb-3 group-hover:text-yellow-300 transition-colors tracking-tight leading-none">
                                            {item.title}
                                        </h3>
                                        <div className="text-xl text-gray-300 font-medium mb-8 flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                            {item.organization}
                                        </div>

                                        <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light italic border-l-2 border-white/10 pl-6">
                                            {item.description}
                                        </p>

                                        {/* Details List */}
                                        {item.details && (
                                            <ul className="space-y-3 mb-6 border-t border-white/5 pt-6">
                                                {item.details.map((detail, idx) => (
                                                    <li key={idx} className="flex gap-3 text-sm text-gray-400">
                                                        <span className="text-yellow-500/60 text-lg leading-none mt-0.5">❖</span>
                                                        <span className="tracking-wide">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Badge */}
                                    <div className="mt-auto pt-4 flex items-center justify-end">
                                        <div className="flex items-center gap-2 text-yellow-500/60 group-hover:text-yellow-400 transition-colors">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="text-xs uppercase tracking-widest font-bold">Verified Credential</span>
                                        </div>
                                    </div>

                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div >
    );
};

export default EducationView;
