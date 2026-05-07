import React from 'react';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
  return (
    <section className="py-40 px-8 bg-surface relative overflow-hidden text-center">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-12 block">OUR PHILOSOPHY</span>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light italic leading-tight text-text-primary mb-12">
            "Mathematics is the alphabet with which <span className="bg-gradient-to-r from-accent to-blue bg-clip-text text-transparent not-italic font-normal">the universe</span> is written. We just added a low-latency connection."
          </h2>

          <div className="font-mono text-[11px] tracking-[0.25em] text-text-muted uppercase">
            — ORION QUANT CORE DOCTRINE
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-blue/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default PhilosophySection;
