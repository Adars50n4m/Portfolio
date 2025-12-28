import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, ChevronDown, User, Home, Zap, Briefcase, GraduationCap, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NetflixNavbar = ({ activeCategory, onSelectCategory, profile, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: 'Home', icon: Home },
        { name: 'Skills', icon: Zap },
        { name: 'Experience', icon: Briefcase },
        { name: 'Education', icon: GraduationCap },
        { name: 'Contact', icon: Mail }
    ];

    // Find active index for the sliding cursor
    const activeIndex = navItems.findIndex(item => item.name === activeCategory);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'}`}>
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div
                        className="cursor-pointer scale-105 hover:scale-110 transition-transform z-50 relative"
                        onClick={onLogout}
                    >
                        <img src="/logo-full.png" alt="ADARSH" className="h-8 md:h-12 object-contain" />
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-6 text-sm text-gray-200">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className={`cursor-pointer transition-colors font-medium ${activeCategory === item.name ? 'text-white font-bold' : 'text-gray-300 hover:text-gray-400'}`}
                                onClick={() => onSelectCategory(item.name)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 md:gap-6 text-white z-50 relative">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />

                    {/* Desktop Profile Dropdown */}
                    <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
                        <motion.div
                            layoutId={`profile-img-${profile?.id || 1}`}
                            layout
                            className="w-8 h-8 rounded-md overflow-hidden border border-transparent group-hover:border-white relative z-50"
                            transition={{ duration: 0.85, ease: "easeInOut" }}
                        >
                            {profile?.img ? (
                                <img src={profile.img} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-blue-500 flex items-center justify-center font-bold text-xs">
                                    {profile ? profile.name[0] : 'U'}
                                </div>
                            )}
                        </motion.div>
                        <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180`} />

                        {/* Dropdown - Profile Info Only */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 border border-gray-700 rounded p-4 hidden group-hover:block transition-all">
                            <p className="text-xs text-gray-400 mb-2">Current Profile</p>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 rounded overflow-hidden">
                                    {profile?.img ? (
                                        <img src={profile.img} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-[10px]">{profile?.name[0]}</div>
                                    )}
                                </div>
                                <span className="text-sm font-bold">{profile?.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Profile Icon */}
                    <div className="w-8 h-8 rounded overflow-hidden border border-white/20 md:hidden relative">
                        {profile?.img ? (
                            <img src={profile.img} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-500 flex items-center justify-center font-bold text-xs">
                                {profile ? profile.name[0] : 'U'}
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle (The Solid Retraction - Iteration 35) */}
                    <div className="md:hidden relative z-50 h-10 w-10 flex items-center justify-center">
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-90 transition-all duration-200"
                            style={{
                                background: 'rgba(30, 30, 30, 0.3)',
                                backdropFilter: 'blur(60px) saturate(220%) contrast(110%)',
                                WebkitBackdropFilter: 'blur(60px) saturate(220%) contrast(110%)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Portal (Fixed Overlay - Manual GPU Morph) */}
            <AnimatePresence mode="sync">
                {isMobileMenuOpen && (
                    <>
                        {/* 1. Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[990] bg-black/40 backdrop-blur-[4px] md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* 2. The Liquid Menu (Fixed Position - Top Right Anchor) */}
                        <motion.div
                            className="fixed z-[999] overflow-hidden md:hidden"
                            style={{
                                top: 16, // Top padding
                                right: 16, // Right padding
                                background: 'rgba(30, 30, 30, 0.3)', // Ultra-light dark tint (almost clear)
                                backdropFilter: 'blur(60px) saturate(220%) contrast(110%)', // iOS "Vibrancy" Shader
                                WebkitBackdropFilter: 'blur(60px) saturate(220%) contrast(110%)',
                                border: '1px solid rgba(255,255,255,0.15)', // Glass Edge
                                boxShadow: '0 40px 80px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' // Specular Inner Glow + Deep Shadow
                            }}
                            initial={{ width: 40, height: 40, borderRadius: 20, opacity: 1 }} // Start Solid (No Fade-in)
                            animate={{ width: 300, height: 480, borderRadius: 32, opacity: 1 }}
                            exit={{ width: 40, height: 40, borderRadius: 20, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }} // Solid Shrink
                            transition={{ type: "spring", stiffness: 80, damping: 20 }} // Super Slow Morph
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }} // Instant Fade Out on Exit
                                transition={{ duration: 0.2, delay: 0.15 }} // Delay to prevent jitter on entry
                                className="absolute inset-0 p-6 flex flex-col"
                            >
                                {/* Fixed Width Wrapper */}
                                <div className="w-[252px]">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg shrink-0">
                                                {profile?.img ? (
                                                    <img src={profile.img} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-xs font-bold">{profile?.name[0]}</div>
                                                )}
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <h3 className="text-white font-bold text-base leading-none">{profile?.name}</h3>
                                                <p className="text-[9px] text-white/50 uppercase font-bold tracking-widest mt-1">Creator</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90 shrink-0"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>

                                    {/* Navigation Items */}
                                    <div className="flex flex-col gap-2">
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = activeCategory === item.name;
                                            return (
                                                <motion.div
                                                    key={item.name}
                                                    className={`relative overflow-hidden flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-white text-black pl-5 shadow-lg shadow-white/10' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectCategory(item.name);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <Icon className={`w-5 h-5 relative z-10 shrink-0 ${isActive ? 'text-black' : 'text-current'}`} />
                                                    <span className="text-sm font-bold tracking-wide relative z-10 whitespace-nowrap">{item.name}</span>

                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="menu-glow"
                                                            className="absolute inset-0 bg-white opacity-100 z-0"
                                                        />
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Simple Footer */}
                                    <div className="mt-8 pt-4 border-t border-white/5 text-center">
                                        <p className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Designed by Adarsh</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default NetflixNavbar;
