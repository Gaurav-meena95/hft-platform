import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const headline = "Who We Are";
  const lines = [
    "At SRHFT, we are a team of experts in High-Frequency",
    "Trading software development. We specialize in creating",
    "cutting-edge solutions that provide our clients with a",
    "competitive edge in the financial markets."
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden py-24 md:py-32">
      {/* Background Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
        <span className="text-[30vw] font-display font-bold leading-none tracking-tighter will-change-transform">SRHFT</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-8 md:space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tight will-change-transform">
                {headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-primary shadow-[0_0_15px_rgba(0,212,255,0.8)]" 
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-3xl text-text-secondary leading-tight will-change-transform"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right Visual (Glowing Orb) */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96">
              <motion.div 
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[120px] rounded-full will-change-transform"
              />
              <motion.div 
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-blue-600/15 blur-[60px] md:blur-[100px] rounded-full mix-blend-screen will-change-transform"
              />
              <div className="absolute inset-8 sm:inset-12 border border-white/10 rounded-full backdrop-blur-3xl flex items-center justify-center">
                <div className="w-3 h-3 md:w-5 md:h-5 bg-primary rounded-full shadow-[0_0_40px_rgba(0,212,255,1)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider Line */}
      <div className="absolute bottom-0 left-0 w-full px-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent relative">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/40 shadow-[0_0_15px_rgba(0,212,255,0.6)] origin-center will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
