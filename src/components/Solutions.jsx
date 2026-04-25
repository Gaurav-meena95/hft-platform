import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, Settings, Shield } from 'lucide-react';

const SolutionCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.4 } }}
      className="group relative glass p-8 md:p-12 rounded-[2rem] border border-white/10 overflow-hidden transition-all duration-500 hover:border-primary/50 will-change-transform cursor-pointer"
    >
      {/* Hover Background Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6 md:space-y-8">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]">
          <Icon size={28} className="text-white/60 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 flex items-center gap-2 text-xs md:text-sm font-bold text-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          LEARN MORE <span className="group-hover:translate-x-1 transition-transform">→</span>
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
    <section id="solutions" className="py-24 md:py-32 bg-black relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Our Solutions
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </motion.div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {solutions.map((item, i) => (
            <SolutionCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
