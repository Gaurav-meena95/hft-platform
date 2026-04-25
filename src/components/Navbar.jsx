import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`relative flex items-center justify-between rounded-full px-8 py-3 transition-all duration-500 ${
          isScrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]' : 'bg-transparent border border-transparent'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)]">
              <div className="w-4 h-4 bg-black rounded-sm transform rotate-45" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tighter">
              SR<span className="text-primary">HFT</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Solutions', 'Technology', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors duration-300 tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold text-white hover:text-primary transition-colors duration-300">
              Client Portal
            </button>
            <button className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-primary hover:text-black transition-all duration-300 hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
