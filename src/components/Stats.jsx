import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const StatItem = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isFloat = value.includes('.');
  
  const motionValue = useSpring(0, {
    damping: 40,
    stiffness: 90,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  const displayValue = useTransform(motionValue, (latest) => {
    if (isFloat) return latest.toFixed(1) + suffix;
    return Math.floor(latest) + suffix;
  });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-12 relative group will-change-transform">
      <div className="relative mb-2">
        <motion.span className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white block text-glow">
          <motion.span>{displayValue}</motion.span>
        </motion.span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className="text-text-secondary text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
        {label}
      </span>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-24 bg-black relative z-10 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-0 items-center">
          <StatItem value="10" suffix="ms" label="Latency" />
          <StatItem value="99.9" suffix="%" label="Uptime" />
          <StatItem value="500" suffix="+" label="Clients" />
          <StatItem value="50" suffix="+" label="Exchanges" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
