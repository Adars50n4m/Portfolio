import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import VideoCard from './ui/VideoCard';

const projects = [
    { id: 1, title: "Cinematic Reel", category: "Editing", color: "from-rose-900 to-rose-600", videoSrc: "/videos/clip1.mp4", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "VFX Composite", category: "After Effects", color: "from-blue-900 to-blue-600", videoSrc: "/videos/clip2.mp4", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "AI Generation", category: "Prompt Engineering", color: "from-purple-900 to-purple-600", videoSrc: "/videos/clip3.mp4", thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Brand Story", category: "Commercial", color: "from-emerald-900 to-emerald-600", videoSrc: "/videos/clip4.mp4", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Social Media Cut", category: "Short Form", color: "from-amber-900 to-amber-600", videoSrc: "/videos/clip5.mp4", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "Music Video", category: "Production", color: "from-indigo-900 to-indigo-600", videoSrc: "/videos/clip6.mp4", thumbnail: "https://images.unsplash.com/photo-1514525253440-b39345208668?q=80&w=1000&auto=format&fit=crop" },
];

const Portfolio = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const isMobile = window.innerWidth < 768; // Simple check for initial render, usually better with hook
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section id="work" ref={targetRef} className="relative min-h-screen md:h-[300vh] bg-neutral-950/50">
            <div className="md:sticky md:top-0 flex flex-col md:flex-row md:h-screen md:items-center overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden px-6 pt-12 pb-6">
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Selected <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Works
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Tap cards to view details.
                    </p>
                </div>

                <motion.div
                    style={window.innerWidth >= 768 ? { x } : {}}
                    className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-24 pb-12 md:pb-0"
                >

                    {/* Desktop Intro Card */}
                    <div className="hidden md:flex flex-shrink-0 w-[400px] flex-col justify-center">
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                            Selected <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                Works
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Hover over the cards to play preview. <br />
                            <span className="text-sm text-neutral-500 mt-2 block">
                                (Note: Place video files clip1.mp4 - clip6.mp4 in public/videos/)
                            </span>
                        </p>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project) => (
                        <div key={project.id} className="group relative pr-12 last:pr-24">
                            <VideoCard
                                project={project}
                                className="w-full md:w-[600px] h-[300px] md:h-[400px] flex-shrink-0"
                            />
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
