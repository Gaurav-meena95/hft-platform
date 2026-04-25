import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const headline = "Who We Are";
  const para = "At SRHFT, we are a team of experts in High-Frequency Trading software development. We specialize in creating cutting-edge solutions that provide our clients with a competitive edge in the financial markets.";
  
  const words = headline.split(" ");
  const lines = [
    "At SRHFT, we are a team of experts in High-Frequency",
    "Trading software development. We specialize in creating",
    "cutting-edge solutions that provide our clients with a",
    "competitive edge in the financial markets."
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden py-32">
      {/* Background Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25vw] font-display font-bold leading-none tracking-tighter">SRHFT</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              <div className="h-1 w-24 bg-primary shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
            </div>

            <div className="space-y-4">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                  className="text-xl md:text-3xl text-text-secondary leading-tight"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right Visual (Glowing Orb) */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <motion.div 
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"
              />
              <motion.div 
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full mix-blend-screen"
              />
              <div className="absolute inset-10 border border-white/5 rounded-full backdrop-blur-3xl flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_30px_rgba(0,212,255,1)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider Line */}
      <div className="absolute bottom-0 left-0 w-full px-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.5)] origin-center"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
