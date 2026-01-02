import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const ZoomTransition = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.6,
                ease: "circOut"
            }}
            className={`w-full h-full ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ZoomTransition;
