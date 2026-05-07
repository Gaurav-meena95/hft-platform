import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: '99.9%', label: 'Uptime Reliability' },
  { value: '10ms', label: 'Execution Latency' },
  { value: '500+', label: 'Global Clients' },
  { value: '1.2B+', label: 'Daily Volume' }
];

const MetricsBand = () => {
  return (
    <section className="border-y border-border bg-surface relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {metrics.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative px-8 py-12 text-center overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="relative font-serif text-4xl md:text-5xl font-light bg-gradient-to-br from-text-primary to-accent bg-clip-text text-transparent mb-2 block">
              {metric.value}
            </span>
            <span className="relative font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
              {metric.label}
            </span>

            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MetricsBand;
