import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate="visible"
            >
                <motion.path
                    d="M20 5L35 30H5L20 5Z"
                    stroke="white"
                    strokeWidth="2"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration: 1.5, ease: "easeInOut" }
                        }
                    }}
                />
                <motion.path
                    d="M20 12L28 26H12L20 12Z"
                    fill="white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                />
                <motion.circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#10B981"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </motion.svg>
            <div className="flex flex-col">
                <span className="font-bold text-lg tracking-widest leading-none">ADARSH</span>
                <span className="text-[10px] text-emerald-500 tracking-[0.3em] leading-none">VISUALS</span>
            </div>
        </div>
    );
};

export default Logo;
