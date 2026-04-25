import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/60 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.5)]">
            <div className="w-5 h-5 bg-black rounded-sm transform rotate-45" />
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tighter">
            SR<span className="text-primary">HFT</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Solutions', 'Technology', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors duration-300 tracking-wide uppercase"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-primary text-primary text-sm font-bold rounded-full hover:bg-primary hover:text-black transition-all duration-300">
            Client Login
          </button>
        </div>

        {/* Mobile Toggle Placeholder */}
        <div className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
