import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BacktestingSection = () => {
  const [activeYear, setActiveYear] = useState(0);

  const timeline = [
    { year: "2020", title: "COVID-19 Global Crash", desc: "Maintained complete stability and executed protective stops during the historic V-shaped recovery." },
    { year: "2021", title: "Crypto Volatility Spike", desc: "Adapted to unusual cross-asset correlations, maintaining edge in highly volatile sessions." },
    { year: "Feb 2022", title: "Russia-Ukraine War", desc: "Handled extreme geopolitical shocks and liquidity gaps without systemic failure." },
    { year: "2023", title: "Global Liquidity Crisis", desc: "Optimized execution algorithms adapted to thin order books and widening spreads." },
    { year: "2024", title: "AI Market Disruption", desc: "Successfully navigated algorithmic feedback loops driven by new AI trading models." }
  ];

  const metrics = [
    { name: "Execution Consistency", value: 99.9 },
    { name: "Downside Control", value: 95.5 },
    { name: "Recovery Behavior", value: 92.0 },
    { name: "Drawdown Prevention", value: 96.8 },
    { name: "Latency Preservation", value: 99.5 }
  ];

  return (
    <section id="technology" className="py-32 bg-background relative z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            Stability even during crises
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Column: Timeline list */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {timeline.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveYear(i)}
                className={`w-full text-left px-6 py-5 flex items-center justify-between border-l-2 transition-all ${
                  activeYear === i 
                    ? 'border-primary bg-white/5' 
                    : 'border-transparent hover:bg-white/[0.02]'
                }`}
              >
                <span className={`text-lg transition-colors ${activeYear === i ? 'text-white font-medium' : 'text-text-secondary font-light'}`}>
                  {item.year} — {item.title}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Right Column: Description */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center min-h-[200px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-display font-medium text-white mb-4">{timeline[activeYear].title}</h3>
                <p className="text-text-secondary text-lg font-light leading-relaxed">
                  {timeline[activeYear].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest uppercase text-text-secondary">{metric.name}</span>
              <div className="h-[2px] w-full bg-border relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                  className="absolute top-0 left-0 bottom-0 bg-primary"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BacktestingSection;;
