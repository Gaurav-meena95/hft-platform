import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const StatItem = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Convert string value to number if possible for animation
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isFloat = value.includes('.');
  
  const motionValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
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
    <div ref={ref} className="flex flex-col items-center justify-center px-8 relative group">
      <div className="relative">
        <motion.span className="text-4xl md:text-6xl font-display font-bold text-white mb-2 block text-glow">
          <motion.span>{displayValue}</motion.span>
        </motion.span>
        {/* Subtle glow under number */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className="text-text-secondary text-sm md:text-base uppercase tracking-[0.2em] font-medium">
        {label}
      </span>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-24 bg-black relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-y-12 md:gap-y-0">
          <StatItem value="10" suffix="ms" label="Latency" />
          <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_10px_rgba(0,212,255,0.2)]" />
          
          <StatItem value="99.9" suffix="%" label="Uptime" />
          <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_10px_rgba(0,212,255,0.2)]" />
          
          <StatItem value="500" suffix="+" label="Clients" />
          <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_10px_rgba(0,212,255,0.2)]" />
          
          <StatItem value="50" suffix="+" label="Exchanges" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
