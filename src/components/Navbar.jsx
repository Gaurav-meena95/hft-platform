import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Solutions', id: 'solutions' },
    { name: 'Technology', id: 'technology' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['solutions', 'technology', 'about', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        performScroll(id);
      }, 300);
    } else {
      performScroll(id);
    }
  };

  const performScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      if (window.lenis) {
        window.lenis.scrollTo(offsetPosition, { duration: 1.2 });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
          }}
          className="flex items-center gap-3 cursor-pointer relative z-[10000]"
        >
          {/* Logo Icon — exactly matching the constellation square style */}
          <div className="w-11 h-11 bg-[#0f1729] rounded-md shadow-lg flex items-center justify-center border border-[#1e3a5f]/60 overflow-hidden relative">
            <svg viewBox="0 0 100 100" className="w-full h-full p-1.5">
              {/* Faint blue grid lines */}
              <line x1="25" y1="0"  x2="25" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>
              <line x1="50" y1="0"  x2="50" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>
              <line x1="75" y1="0"  x2="75" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>
              <line x1="0" y1="25"  x2="100" y2="25" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>
              <line x1="0" y1="50"  x2="100" y2="50" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>
              <line x1="0" y1="75"  x2="100" y2="75" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5"/>

              {/* Constellation connecting lines — draw animation */}
              <g className="draw-line" style={{strokeDasharray: 300, strokeDashoffset: 300, animation: 'draw 1.5s ease forwards 0.3s'}}>
                <line x1="22" y1="18" x2="55" y2="30" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                <line x1="55" y1="30" x2="75" y2="18" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                <line x1="55" y1="30" x2="50" y2="55" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                <line x1="50" y1="55" x2="30" y2="68" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                <line x1="50" y1="55" x2="70" y2="65" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                <line x1="30" y1="68" x2="45" y2="85" stroke="white" strokeWidth="1.2" opacity="0.6"/>
              </g>

              {/* Star dots */}
              <circle cx="22" cy="18" r="3.5" fill="white"/>
              <circle cx="55" cy="30" r="3.5" fill="white"/>
              <circle cx="75" cy="18" r="3.5" fill="white"/>
              <circle cx="50" cy="55" r="4"   fill="white"/>
              <circle cx="30" cy="68" r="3.5" fill="white"/>
              <circle cx="70" cy="65" r="3.5" fill="white"/>
              <circle cx="45" cy="85" r="3"   fill="white"/>
            </svg>
          </div>

          {/* Logo Text — bold brand name, exactly as in the logo */}
          <span className="text-[1.35rem] font-display font-bold text-white tracking-widest leading-none">
            ORION QUANT
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className={`text-xs font-medium transition-all duration-300 tracking-[0.2em] uppercase relative ${
                activeSection === item.id ? 'text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNavDot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-nebula-1"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Client Login Button */}
        <div className="hidden md:flex">
          <button 
            className="px-6 py-2 border border-nebula-1 text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-nebula-1 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            Client Login
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 relative z-[10000]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} className="text-nebula-1" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black z-[9999] md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((item, i) => (
                <motion.button 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl font-display font-medium uppercase tracking-[0.2em] transition-all ${
                    activeSection === item.id ? 'text-nebula-1' : 'text-text-muted hover:text-white'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 px-10 py-3 border border-nebula-1 text-white font-bold tracking-widest uppercase rounded hover:bg-nebula-1 hover:text-black transition-colors"
              >
                Client Login
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
