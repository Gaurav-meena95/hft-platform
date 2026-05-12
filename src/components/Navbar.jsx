import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Solutions', id: 'solutions' },
    { name: 'Strategy', id: 'strategy' },
    { name: 'Performance', id: 'performance' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 border-b border-transparent ${isScrolled
          ? 'py-4 glass border-border bg-black/60'
          : 'py-8 bg-transparent'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border-[1.5px] border-accent rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-[5px] border-[1.5px] border-blue rounded-full animate-[spin_5s_linear_infinite_reverse]" />
            <div className="absolute inset-[11px] bg-accent rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[13px] tracking-[0.15em] text-text-primary uppercase">
              ORION QUANT
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase -mt-0.5">
              Institutional HFT
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>

        {/* Nav CTA */}
        <div className="hidden md:flex items-center gap-6">
          <button className="w-11 h-6 bg-border border border-border rounded-full relative cursor-pointer group">
            <div className="absolute top-1 left-1 w-3.5 h-3.5 bg-accent rounded-full transition-transform duration-300 group-hover:scale-110" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-mono text-[11px] tracking-[0.12em] uppercase px-6 py-2.5 border border-accent text-accent hover:bg-accent hover:text-background transition-all duration-300 rounded-[2px]"
          >
            Access Terminal
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/95 z-[999] flex flex-col items-center justify-center gap-8 md:hidden px-8 text-center"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-display text-2xl uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="font-mono text-sm tracking-[0.12em] uppercase px-12 py-4 border border-accent text-accent mt-4"
            >
              Access Terminal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

