import React from 'react';

const LiquidBackground = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none">
            {/* Netflix-like subtle dark gradient or just solid. 
                Using a very subtle vignette to avoid looking "flat" but keeping it "solid" feel. 
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0a0a0a] to-black" />

            {/* Keeping the subtle noise for that premium film grain texture (optional, but good for "Cinematic") */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </div>
    );
};

export default LiquidBackground;
