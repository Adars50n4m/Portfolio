import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
    { id: 1, name: 'Adarsh', color: 'bg-blue-500', img: '/images/editor_profile_3.png' },
];

const ProfileGate = ({ onSelectProfile }) => {

    const handleProfileClick = (profile) => {
        onSelectProfile(profile);
    };

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white font-sans relative overflow-hidden">
            <motion.h1
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-normal mb-12 tracking-wide text-center"
            >
                Who's watching?
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {profiles.map((profile) => (
                    <motion.div
                        key={profile.id}
                        className="group flex flex-col items-center cursor-pointer w-24 md:w-32"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleProfileClick(profile)}
                    >
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 mb-4 shadow-lg`}>
                            {/* Render Image if available */}
                            {profile.img ? (
                                <img
                                    src={profile.img}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className={`w-full h-full ${profile.color} flex items-center justify-center text-2xl font-bold`}>
                                    {profile.name[0]}
                                </div>
                            )}
                        </div>
                        <span className="text-gray-400 text-sm md:text-lg group-hover:text-white transition-colors duration-200">
                            {profile.name}
                        </span>
                    </motion.div>
                ))}

                {/* Add Profile Button */}
                <motion.div
                    className="group flex flex-col items-center cursor-pointer w-24 md:w-32"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 mb-4 shadow-lg flex items-center justify-center bg-[#141414] hover:bg-white/10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-400 group-hover:text-white transition-colors duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="text-gray-400 text-sm md:text-lg group-hover:text-white transition-colors duration-200">
                        Add Profile
                    </span>
                </motion.div>
            </div>

            <button
                className="mt-16 px-6 py-2 border border-gray-400 text-gray-400 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-all duration-200"
            >
                Manage Profiles
            </button>
        </div>
    );
};

export default ProfileGate;
