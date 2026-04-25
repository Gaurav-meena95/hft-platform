import React from 'react';
import { motion } from 'framer-motion';
import {  Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Top glowing border decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(0,212,255,0.3)]" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm transform rotate-45" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tighter">
                SR<span className="text-primary">HFT</span>
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Speed. Precision. Edge. <br />
              The ultimate high-frequency trading platform for institutional excellence.
            </p>
            {/* <div className="flex gap-4">
              {[<i className="fa-brands fa-square-twitter"></i>, <i className="fa-brands fa-linkedin"></i>].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Solutions', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Solutions</h4>
            <ul className="space-y-4">
              {['Trading APIs', 'Market Data', 'Custom Solutions', 'RMS'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-text-secondary text-sm">Stay updated with the latest in HFT technology.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-black rounded-lg hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-secondary text-sm">© 2024 SRHFT Solution Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map((item) => (
              <a key={item} href="#" className="text-text-secondary text-xs hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
