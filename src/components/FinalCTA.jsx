import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="relative py-32 bg-transparent overflow-hidden z-10 border-t border-white/5">
      {/* Background glow specific to CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-nebula-1/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-6 tracking-tight">
            Automation is not a trend.<br />
            <span className="text-nebula-1">It's the next step.</span>
          </h2>
          
          <p className="text-text-muted text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
            Upgrade your trading infrastructure with sub-millisecond execution and institutional-grade reliability.
          </p>

          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              if(el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 bg-nebula-1 text-black text-sm font-bold tracking-[0.2em] uppercase rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.8)] scale-100 hover:scale-105"
          >
            Request First Call
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
