import { motion } from 'framer-motion';
import { ChevronDown, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative px-4">
      {/* Glitch Title */}
      <div className="relative z-10 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative inline-block"
        >
          <motion.h1
            className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 glitch-hover cursor-none"
          >
            ADARSH
          </motion.h1>
          <motion.h1
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 -mt-2 md:-mt-6 glitch-hover cursor-none"
          >
            THAKUR
          </motion.h1>
        </motion.div>
      </div>

      {/* Subtitle & Role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center z-10 space-y-6"
      >
        <div className="flex items-center justify-center gap-4 text-sm md:text-lg font-light tracking-[0.3em] text-neutral-400 uppercase">
          <span>Director</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>Editor</span>
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
          <span>Visual Artist</span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-white text-black rounded-full font-medium flex items-center gap-2 mx-auto cursor-hover"
        >
          <PlayCircle className="w-5 h-5" />
          Watch Showreel
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 z-10 cursor-hover"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
          <ChevronDown className="text-white w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
