import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '3.4x', label: 'Sharpe Ratio' },
  { value: '8.2%', label: 'Max Drawdown' },
  { value: '18ms', label: 'Tick-to-Trade' },
  { value: '94%', label: 'Win Rate' }
];

const PerformanceSection = () => {
  return (
    <section id="performance" className="py-32 px-8 bg-black relative z-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Chart Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass p-8 rounded-[4px] relative"
        >
          <div className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase mb-8">ALPHA GENERATION CURVE</div>
          
          <div className="h-[300px] w-full relative flex items-end gap-1">
            {/* Simple Animated Bars/Line Representation */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${20 + Math.random() * 80}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 1 }}
                className="flex-1 bg-gradient-to-t from-accent/20 to-accent/60 rounded-t-[1px]"
              />
            ))}
            
            {/* Line Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 0 250 Q 150 100 300 180 T 600 50"
                fill="none"
                stroke="var(--color-blue)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-8 flex justify-between font-mono text-[10px] text-text-muted uppercase tracking-widest">
            <span>Market Open</span>
            <span>Mid Session</span>
            <span>Market Close</span>
          </div>
        </motion.div>

        {/* Stats Side */}
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6 block">LIVE PERFORMANCE</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-text-primary mb-10">
            Outpacing the Entropy of Markets
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="p-6 border border-border rounded-[2px] hover:border-accent transition-colors group"
              >
                <span className="text-3xl font-serif text-text-primary group-hover:text-accent transition-colors block mb-1">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PerformanceSection;
