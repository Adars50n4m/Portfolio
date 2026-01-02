import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div
            className={`relative overflow-hidden bg-zinc-800 ${className}`}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
};

export default Skeleton;
