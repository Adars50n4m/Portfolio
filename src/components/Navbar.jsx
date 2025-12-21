import { motion } from 'framer-motion';
import Logo from './ui/Logo';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference"
        >
            <Logo />
            <div className="hidden md:flex gap-8">
                {['Work', 'About', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-medium tracking-widest hover:text-emerald-400 transition-colors uppercase cursor-hover"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </motion.nav>
    );
};

export default Navbar;
