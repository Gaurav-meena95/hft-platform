import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.4)]">
                <div className="w-7 h-7 bg-black rounded-sm transform rotate-45" />
              </div>
              <span className="text-4xl font-display font-bold text-white tracking-tighter">
                SR<span className="text-primary">HFT</span>
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "linear" }}
              className="absolute -bottom-4 left-0 h-[2px] bg-primary shadow-[0_0_15px_rgba(0,212,255,0.6)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
