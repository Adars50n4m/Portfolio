import { motion } from 'framer-motion';
import GlowingCard from './ui/GlowingCard';
import { Video, Zap, Layers, Wand2, Calendar, Award } from 'lucide-react';

const About = () => {
    return (
        <section className="py-24 relative z-10 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Timeline</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Blending technical precision with artistic intuition to create seamless visual narratives.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                    {/* Main Experience Card - Spans 2 cols */}
                    <div className="md:col-span-2 row-span-1">
                        <GlowingCard className="h-full flex flex-col justify-center">
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">7+ Years Experience</h3>
                                    <p className="text-neutral-400">
                                        From cutting broadcast commercials to crafting viral social content, I've mastered the art of pacing and storytelling.
                                    </p>
                                </div>
                            </div>
                        </GlowingCard>
                    </div>

                    {/* Software Card 1 */}
                    <div className="md:col-span-1 row-span-1">
                        <GlowingCard className="h-full flex flex-col items-center justify-center text-center">
                            <div className="p-4 rounded-full bg-blue-900/20 mb-4">
                                <Video className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Premiere Pro</h3>
                            <p className="text-sm text-neutral-500 mt-2">Expert Workflows</p>
                        </GlowingCard>
                    </div>

                    {/* Software Card 2 */}
                    <div className="md:col-span-1 row-span-1">
                        <GlowingCard className="h-full flex flex-col items-center justify-center text-center" delay={0.1}>
                            <div className="p-4 rounded-full bg-purple-900/20 mb-4">
                                <Layers className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">After Effects</h3>
                            <p className="text-sm text-neutral-500 mt-2">Motion Graphics & VFX</p>
                        </GlowingCard>
                    </div>

                    {/* AI/Prompt Engineering - Spans 2 cols */}
                    <div className="md:col-span-2 row-span-1">
                        <GlowingCard className="h-full flex flex-col justify-center" delay={0.2}>
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <Wand2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">AI-Enhanced Creativity</h3>
                                    <p className="text-neutral-400">
                                        Leveraging Stable Diffusion, Midjourney, and RunwayML to generate custom assets and accelerate post-production.
                                        Expert Prompt Engineering skills.
                                    </p>
                                </div>
                            </div>
                        </GlowingCard>
                    </div>

                    {/* Color Grading */}
                    <div className="md:col-span-1 row-span-1">
                        <GlowingCard className="h-full flex flex-col items-center justify-center text-center" delay={0.3}>
                            <div className="p-4 rounded-full bg-orange-900/20 mb-4">
                                <Zap className="w-8 h-8 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">DaVinci Resolve</h3>
                            <p className="text-sm text-neutral-500 mt-2">Color Grading</p>
                        </GlowingCard>
                    </div>

                    {/* Achievement/Stat */}
                    <div className="md:col-span-2 row-span-1">
                        <GlowingCard className="h-full flex items-center justify-between px-8" delay={0.4}>
                            <div>
                                <h3 className="text-5xl font-bold text-white">500+</h3>
                                <p className="text-neutral-500 mt-2">Projects Delivered</p>
                            </div>
                            <div className="h-20 w-px bg-neutral-800" />
                            <div>
                                <h3 className="text-5xl font-bold text-white">100%</h3>
                                <p className="text-neutral-500 mt-2">Client Satisfaction</p>
                            </div>
                            <Award className="w-16 h-16 text-yellow-500 opacity-20" />
                        </GlowingCard>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
