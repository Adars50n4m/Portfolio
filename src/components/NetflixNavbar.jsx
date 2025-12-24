import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, ChevronDown } from 'lucide-react';

const NetflixNavbar = ({ profile, activeCategory, onSelectCategory, onLogout }) => {
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

    const navItems = ['Home', 'Skills', 'Experience', 'Education', 'Contact'];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'}`}>
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div
                        className="text-red-600 font-black text-2xl md:text-4xl tracking-tighter cursor-pointer scale-105 hover:scale-110 transition-transform z-50 relative"
                        onClick={onLogout}
                    >
                        ADARSH
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-6 text-sm text-gray-200">
                        {navItems.map((item) => (
                            <li
                                key={item}
                                className={`cursor-pointer transition-colors font-medium ${activeCategory === item ? 'text-white font-bold' : 'text-gray-300 hover:text-gray-400'}`}
                                onClick={() => onSelectCategory(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6 text-white z-50 relative">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
                    <p className="hidden md:block text-sm font-medium cursor-pointer">Children</p>
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />

                    <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
                        <div className="w-8 h-8 rounded overflow-hidden border border-transparent group-hover:border-white transition-all">
                            {profile?.img ? (
                                <img src={profile.img} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-blue-500 flex items-center justify-center font-bold text-xs">
                                    {profile ? profile.name[0] : 'U'}
                                </div>
                            )}
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180`} />

                        {/* Dropdown */}
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
                            <div className="border-t border-gray-700 my-2" />
                            <p className="text-sm hover:underline cursor-pointer" onClick={onLogout}>Sign out of Cut.Efx</p>
                        </div>
                    </div>

                    <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Glass Overlay */}
            <div className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col gap-8 text-center">
                    {navItems.map((item, index) => (
                        <li
                            key={item}
                            className={`text-3xl font-black cursor-pointer transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${activeCategory === item ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-white'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => {
                                onSelectCategory(item);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            {item}
                        </li>
                    ))}

                    <div className="w-12 h-1 bg-gray-800 rounded-full my-4 mx-auto" />

                    <li
                        className={`text-xl font-medium text-gray-500 cursor-pointer hover:text-white transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '600ms' }}
                        onClick={onLogout}
                    >
                        Sign Out
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NetflixNavbar;
