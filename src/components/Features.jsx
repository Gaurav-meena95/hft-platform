import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Cpu, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, reverse = false, darkBg = false }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div 
      ref={containerRef}
      className={`py-24 md:py-32 ${darkBg ? 'bg-surface' : 'bg-black'} relative overflow-hidden`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-32`}>
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-6 md:space-y-8 will-change-transform"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="text-text-secondary text-base md:text-xl leading-relaxed">
              {description}
            </p>
            <button className="text-primary font-bold flex items-center gap-2 group cursor-pointer transition-transform hover:translate-x-2">
              LEARN MORE 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          {/* Visual Element (Parallax) */}
          <motion.div 
            style={{ y }}
            className="flex-1 w-full will-change-transform"
          >
            <div className="glass p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/10 relative group hover:border-primary/40 transition-all duration-700">
              <div className="absolute inset-0 bg-primary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,212,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.4)] transition-all duration-500">
                  <Icon size={48} className="text-primary md:scale-125" />
                </div>
                <div className="space-y-4 w-full">
                  <div className="h-1.5 w-1/2 bg-white/10 rounded-full mx-auto" />
                  <div className="h-1.5 w-3/4 bg-white/5 rounded-full mx-auto" />
                  <div className="h-1.5 w-2/3 bg-white/5 rounded-full mx-auto" />
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/30 rounded-tr-[2rem] md:rounded-tr-[3rem]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-primary/30 rounded-bl-[2rem] md:rounded-bl-[3rem]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="solutions" className="relative z-10">
      {/* Section Header */}
      <div className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="inline-block px-4"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Why Choose SRHFT
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

      <FeatureCard 
        icon={Code2}
        title="Expert Development"
        description="Our team of world-class engineers builds bespoke trading infrastructure tailored to your specific strategy needs. Optimized for maximum performance and reliability."
        reverse={false}
      />

      <FeatureCard 
        icon={Cpu}
        title="Advanced Algorithms"
        description="Harness state-of-the-art machine learning and proprietary signal processing to stay ahead. Our algorithms adapt to market volatility in real-time."
        reverse={true}
        darkBg={true}
      />

      <FeatureCard 
        icon={Zap}
        title="Lightning Fast Trading"
        description="Execution speeds measured in microseconds. We minimize every tick of latency through hardware acceleration and direct connectivity."
        reverse={false}
      />
    </section>
  );
};

export default Features;
