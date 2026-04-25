import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const headline = "Maximize Your Edge in Financial Markets";
  const words = headline.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const tickerItems = [
    "10ms Latency", "99.9% Uptime", "500+ Clients", "NSE", "BSE", "MCX"
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
            {words.map((word, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto mb-12"
          >
            Ultra-low latency HFT solutions built for precision and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="px-10 py-4 bg-primary text-black font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95">
              Get Started
            </button>
            <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Ticker Bar */}
      <div className="relative z-10 py-8 bg-white/5 backdrop-blur-md border-y border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-white text-sm font-display font-medium tracking-widest px-12 uppercase">{item}</span>
              <span className="text-primary/40 text-xl font-light">|</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
