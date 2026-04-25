import React from 'react';
import { motion } from 'framer-motion';
import {  Mail, Globe, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Top glowing border decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(0,212,255,0.4)]" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Logo & Tagline */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <div className="w-4 h-4 bg-black rounded-sm transform rotate-45" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tighter">
                SR<span className="text-primary">HFT</span>
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              Speed. Precision. Edge. <br />
              The ultimate high-frequency trading platform for institutional excellence.
            </p>
            <div className="flex gap-4">
              {[ Globe, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] will-change-transform active:scale-90"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Company</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Solutions', 'Blog'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm md:text-base">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Solutions</h4>
            <ul className="space-y-4">
              {['Trading APIs', 'Market Data', 'Custom Solutions', 'RMS'].map((item) => (
                <li key={item}>
                  <a href="#technology" className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm md:text-base">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">Newsletter</h4>
            <p className="text-text-secondary text-sm leading-relaxed">Stay updated with the latest in HFT technology and market insights.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-all duration-300"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-black rounded-lg hover:bg-white transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-secondary text-[10px] md:text-xs tracking-widest uppercase">© 2024 SRHFT Solution Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map((item) => (
              <a key={item} href="#" className="text-text-secondary text-[10px] md:text-xs uppercase tracking-widest hover:text-white transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
