import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const tickerText = "SRHFT Technologies · Institutional Trading Infrastructure · Speed. Precision. Edge. · ";

  return (
    <footer className="bg-background pt-32 relative overflow-hidden border-t border-border">
      
      <div className="container mx-auto px-6 mb-24">
        <h2 className="text-4xl md:text-6xl font-display font-medium text-white max-w-4xl tracking-tight leading-tight">
          The next logical step for modern trading.
        </h2>
      </div>

      {/* Ticker */}
      <div className="relative z-10 py-5 bg-transparent border-y border-border overflow-hidden mb-24">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="text-text-secondary text-xs font-display tracking-[0.2em] px-4 uppercase">
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          {/* Logo Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center transition-transform duration-300">
                <div className="w-3 h-3 bg-background rounded-sm transform rotate-45" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">
                SR<span className="text-primary">HFT</span>
              </span>
            </div>
            <p className="text-text-secondary max-w-xs font-light leading-relaxed">
              Tailored software infrastructure for corporate capital, engineered for maximum reliability and control.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Solutions', 'Technology', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary font-light hover:text-white transition-colors text-sm">
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
              {['Documentation', 'API Reference', 'Status', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary font-light hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-secondary text-sm font-light">© 2024 SRHFT Solution Pvt Ltd</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <Mail size={18} />
            </a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <Phone size={18} />
            </a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
