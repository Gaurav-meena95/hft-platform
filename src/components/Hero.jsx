import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const line1 = "A Structured Approach to".split(" ");
  const line2 = "High Frequency Trading".split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const wordAnim = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-medium text-white mb-8 leading-[1.1] tracking-tight"
          >
            <div className="flex flex-wrap gap-x-4 mb-2">
              {line1.map((word, i) => (
                <div key={i} className="overflow-hidden inline-block">
                  <motion.div variants={wordAnim} className="inline-block text-text-secondary">
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4">
              {line2.map((word, i) => (
                <div key={i} className="overflow-hidden inline-block">
                  <motion.div variants={wordAnim} className="inline-block text-white">
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed"
          >
            SRHFT Engine enables structured and controlled execution on your own accounts in financial markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-24"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if(el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-primary text-black font-semibold rounded-sm hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              Request First Call
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('solutions');
                if(el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-border text-white font-semibold rounded-sm hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              View Solutions
            </button>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 bg-transparent border border-border rounded-sm text-left hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Capital Protection
              </h3>
              <p className="text-text-secondary text-sm">Customizable risk management</p>
            </div>
            <div className="p-6 bg-transparent border border-border rounded-sm text-left hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Instant Deployment
              </h3>
              <p className="text-text-secondary text-sm">Simple system integration</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
