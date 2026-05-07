import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="py-40 px-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
        <div className="absolute inset-0 border border-accent rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-20 border border-blue rounded-full animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-40 border border-accent rounded-full animate-ping" style={{ animationDuration: '8s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl"
      >
        <span className="font-mono text-[11px] tracking-[0.4em] text-accent uppercase mb-12 block">ESTABLISH CONNECTION</span>
        
        <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight text-text-primary mb-12">
          Ready to transcend the limits of traditional trading?
        </h2>

        <p className="text-lg text-text-muted font-light mb-16">
          Access is strictly limited to institutional partners and high-net-worth individuals. Establish a secure connection with our terminal.
        </p>

        <form className="max-w-md mx-auto space-y-6">
          <div className="relative group">
            <input 
              type="email" 
              placeholder="ENTER SECURE EMAIL"
              className="w-full bg-surface/50 border border-border px-6 py-5 font-mono text-xs tracking-widest text-text-primary focus:outline-none focus:border-accent transition-colors rounded-[2px]"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
          </div>
          
          <button className="w-full font-mono text-[12px] tracking-[0.12em] uppercase px-12 py-5 bg-accent text-background rounded-[2px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(200,169,110,0.25)] transition-all duration-300">
            Request Private Access
          </button>
        </form>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-40 pt-20 border-t border-border w-full flex flex-col md:flex-row items-center justify-between font-mono text-[9px] tracking-[0.3em] text-text-muted uppercase">
        <span>© 2026 ORION QUANT</span>
        <div className="flex gap-8 mt-8 md:mt-0">
          <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms</a>
          <a href="#" className="hover:text-accent transition-colors">Security</a>
        </div>
        <span>Coordinates: 28.6139° N, 77.2090° E</span>
      </div>
    </section>
  );
};

export default ContactSection;
