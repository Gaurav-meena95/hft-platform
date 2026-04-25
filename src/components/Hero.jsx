import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const headline = "Maximize Your Edge in Financial Markets";
  const words = headline.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
  };

  const tickerItems = [
    "10ms Latency", "99.9% Uptime", "500+ Clients", "NSE", "BSE", "MCX"
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black pt-20">
      {/* Background Polish: Gradient + Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/15 blur-[120px] rounded-full animate-pulse will-change-transform" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full will-change-transform" />
        <div className="absolute inset-0 noise-overlay opacity-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 relative z-10 text-center py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight will-change-transform">
            {words.map((word, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="text-text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 will-change-transform"
          >
            Ultra-low latency HFT solutions built for precision and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="group relative px-10 py-4 bg-primary text-black font-bold rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:scale-105 active:scale-95 will-change-transform">
              Get Started
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
            </button>
            <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] will-change-transform active:scale-95">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Ticker Bar - Refined Speed */}
      <div className="relative z-10 py-8 bg-white/5 backdrop-blur-md border-y border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker will-change-transform">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-white/80 text-xs sm:text-sm font-display font-medium tracking-widest px-8 sm:px-16 uppercase">{item}</span>
              <span className="text-primary/30 text-xl font-light">|</span>
            </div>
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
    </section>
  );
};

export default Hero;
