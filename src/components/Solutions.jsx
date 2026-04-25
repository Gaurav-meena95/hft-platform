import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, Settings, Shield } from 'lucide-react';

const SolutionCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative glass p-10 rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50"
    >
      {/* Hover Background Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]">
          <Icon size={32} className="text-white/70 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          LEARN MORE <span>→</span>
        </div>
      </div>

      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: "Trading APIs",
      description: "Custom high-performance APIs for HFT and MFT platforms optimized for maximum throughput.",
      icon: Zap
    },
    {
      title: "Market Data Broadcast",
      description: "Real-time market data insights for global exchanges with microsecond precision delivery.",
      icon: Radio
    },
    {
      title: "Custom Solutions",
      description: "Innovative fintech solutions tailored to your unique trading strategy and infrastructure needs.",
      icon: Settings
    },
    {
      title: "RMS",
      description: "Low latency risk management for high frequency trading ensuring safety without compromising speed.",
      icon: Shield
    }
  ];

  return (
    <section className="py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Our Solutions
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </motion.div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {solutions.map((item, i) => (
            <SolutionCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
