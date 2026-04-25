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
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll and stop Lenis when mobile menu is open
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
        isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer relative z-[10000]"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.5)] group-hover:rotate-12 transition-transform duration-300">
            <div className="w-5 h-5 bg-black rounded-sm transform rotate-45" />
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tighter">
            SR<span className="text-primary">HFT</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className={`nav-link text-sm font-medium transition-all duration-300 tracking-widest uppercase relative ${
                activeSection === item.id ? 'text-primary' : 'text-white/70 hover:text-primary'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 border border-primary/50 text-primary text-sm font-bold rounded-full hover:bg-primary hover:text-black transition-all duration-300 will-change-transform active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 relative z-[10000]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} className="text-primary" /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - FIXED POSITIONING */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0a0a0a] z-[9999] md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((item, i) => (
                <motion.button 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-4xl font-display font-bold transition-all ${
                    activeSection === item.id ? 'text-primary scale-110' : 'text-white hover:text-primary'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollToSection('contact')}
                className="mt-6 px-12 py-5 bg-primary text-black font-extrabold rounded-full text-xl shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
