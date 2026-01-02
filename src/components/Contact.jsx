import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Phone, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { contactInfo } from '../data/resumeData';

const Contact = () => {
    const [copied, setCopied] = useState(null);

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 md:px-12 flex flex-col items-center justify-center relative z-10">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">Get In Touch</span>
                </h2>
                <p className="text-blue-200/80 text-xl max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
                    Ready to bring your vision to life? Let's create something extraordinary together.
                </p>
            </div>

            {/* Unified Digital Business Card - Custom Implementation for Layout Control */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-[2.5rem] border border-white/5 bg-black/60 backdrop-blur-3xl relative group"
            >
                {/* Glossy Reflection Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none z-0" />

                {/* Left Column: Cinematic Profile */}
                <div className="w-full md:w-5/12 relative min-h-[400px] md:min-h-full group bg-black z-10">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                            <img
                                src="/images/editor_profile_1.png"
                                alt="Adarsh"
                                className="w-full h-full object-cover opacity-90"
                            />
                            {/* Cinematic Overlay - Multiple gradients for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 md:block hidden" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
                        <div className="w-16 h-1 bg-[#E50914] mb-6 shadow-[0_0_15px_rgba(229,9,20,0.6)]" />
                        <h3 className="text-5xl font-['Bebas_Neue'] text-white drop-shadow-lg tracking-wide mb-2 leading-none">
                            CONNECT
                        </h3>
                        <p className="text-gray-300 text-sm tracking-[0.2em] uppercase opacity-80 font-medium">
                            Available for Freelance
                        </p>
                    </div>
                </div>

                {/* Right Column: Contact Details */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-black/20 backdrop-blur-md">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="space-y-6 md:space-y-8 relative z-10">
                        {/* Email Section */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-[#E50914] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Mail size={14} /> Direct Contact
                            </h4>

                            {/* Primary Email */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-white/[0.03] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group-hover:border-white/10">
                                    <div className="min-w-0 flex-1 mr-4">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Email</div>
                                        <a href={`mailto:${contactInfo.email} `} className="text-base md:text-lg text-white font-medium truncate block hover:text-blue-400 transition-colors">
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(contactInfo.email, 'email1')}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-95 shrink-0"
                                    >
                                        {copied === 'email1' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Mobile Section */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-[#E50914] uppercase tracking-[0.2em] flex items-center gap-2">
                                <Phone size={14} /> Mobile
                            </h4>
                            <a href={`tel:${contactInfo.phone} `} className="block p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group h-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-lg md:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                            {contactInfo.phone}
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 group-hover:text-gray-400">
                                            <span>Tap to Call</span>
                                        </div>
                                    </div>
                                    <div className="p-2 text-gray-400 group-hover:text-green-400 transition-colors">
                                        <Phone size={20} />
                                    </div>
                                </div>

                            </a>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Socials Section */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-[#E50914] uppercase tracking-[0.2em] flex items-center gap-2">
                                Socials
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={contactInfo.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-lg border border-white/5 bg-gradient-to-br from-purple-900/10 to-pink-900/10 hover:from-purple-900/20 hover:to-pink-900/20 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Instagram size={24} className="text-pink-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Instagram</span>
                                </a>
                                <a
                                    href={contactInfo.socials.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-lg border border-white/5 bg-gradient-to-br from-red-900/10 to-orange-900/10 hover:from-red-900/20 hover:to-orange-900/20 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Youtube size={24} className="text-red-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">YouTube</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            </motion.div >
        </div >
    );
};

export default Contact;
