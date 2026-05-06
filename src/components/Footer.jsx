import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const tickerText = "ORION QUANT Technologies · Institutional HFT · Speed. Precision. Edge. · NSE · BSE · MCX · ";

  return (
    <footer id="contact" className="bg-[#050508] pt-24 relative overflow-hidden border-t border-white/10 z-10">

      {/* Ticker */}
      <div className="relative z-10 py-5 bg-transparent border-b border-white/5 overflow-hidden mb-20">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="text-text-muted text-xs font-display tracking-[0.3em] px-4 uppercase">
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

          {/* Contact Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#0f1729] rounded-md shadow-lg flex items-center justify-center border border-[#1e3a5f]/60 overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full p-1.5">
                  {/* Faint blue grid lines */}
                  <line x1="25" y1="0" x2="25" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  <line x1="75" y1="0" x2="75" y2="100" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#2a4a7f" strokeWidth="0.8" opacity="0.5" />
                  {/* Constellation lines */}
                  <line x1="22" y1="18" x2="55" y2="30" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="55" y1="30" x2="75" y2="18" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="55" y1="30" x2="50" y2="55" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="50" y1="55" x2="30" y2="68" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="50" y1="55" x2="70" y2="65" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="30" y1="68" x2="45" y2="85" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  {/* Star dots */}
                  <circle cx="22" cy="18" r="3.5" fill="white" />
                  <circle cx="55" cy="30" r="3.5" fill="white" />
                  <circle cx="75" cy="18" r="3.5" fill="white" />
                  <circle cx="50" cy="55" r="4" fill="white" />
                  <circle cx="30" cy="68" r="3.5" fill="white" />
                  <circle cx="70" cy="65" r="3.5" fill="white" />
                  <circle cx="45" cy="85" r="3" fill="white" />
                </svg>
              </div>
              <span className="text-[1.35rem] font-display font-bold text-white tracking-widest leading-none">
                ORION QUANT
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-nebula-1 shrink-0 mt-1" />
                <span className="text-text-muted font-light">9312414710</span>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-nebula-1 shrink-0 mt-1" />
                <span className="text-text-muted font-light">info@orionquant.com</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-nebula-1 shrink-0 mt-1" />
                <span className="text-text-muted font-light max-w-xs">
                  L-48, Street No.17, New Mahavir Nagar, New Delhi - 110018
                </span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Solutions', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted font-light hover:text-nebula-1 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Resources</h4>
            <ul className="space-y-4">
              {['Trading APIs', 'Market Data', 'RMS', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted font-light hover:text-nebula-1 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted font-light hover:text-nebula-1 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm font-light tracking-wide">© 2024 ORION QUANT Solution Pvt Ltd</p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-nebula-1 hover:bg-white/10 transition-colors">
              <Mail size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-nebula-1 hover:bg-white/10 transition-colors">
              {/* WhatsApp Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-nebula-1 hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
