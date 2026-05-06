import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BacktestingSection = () => {
  const [activeYear, setActiveYear] = useState(0);

  const crises = [
    {
      year: "2020",
      title: "COVID-19 Global Crash",
      desc: "During the fastest market drop in history, the ORION QUANT engine maintained 100% uptime, executing protective stops within milliseconds and actively managing downside exposure across all connected accounts."
    },
    {
      year: "Feb 2022",
      title: "Russia-Ukraine War",
      desc: "In extreme volatility and gap-downs, the system recalibrated latency-sensitive algorithms, preventing slippage and optimizing entry points during liquidity vacuums."
    },
    {
      year: "Sep 2022",
      title: "UK Mini-Budget Flash Crash",
      desc: "As forex and bond markets experienced unprecedented intra-day swings, strict risk protocols isolated capital from erratic spread widening."
    },
    {
      year: "2023",
      title: "Global Liquidity Crisis",
      desc: "During banking sector instability, the engine dynamically adjusted to thinning order books, ensuring execution consistency without manual intervention."
    },
    {
      year: "2024",
      title: "AI Market Disruption",
      desc: "Navigating sudden algorithmic shifts and tech-driven flash movements, the infrastructure maintained its edge through sub-millisecond reaction times."
    }
  ];

  const metrics = [
    { label: "Execution Consistency", value: 92 },
    { label: "Downside Control", value: 87 },
    { label: "Recovery Behavior", value: 79 },
    { label: "Risk Protocols Active", value: 95 }
  ];

  return (
    <section className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h4 className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            RESULTS / BACKTESTING
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white max-w-4xl leading-tight">
            Stability even during crises and market downturns
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
          {/* Left side: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/3 flex flex-col space-y-4"
          >
            {crises.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveYear(i)}
                className={`text-left pl-6 py-3 border-l-2 transition-all duration-300 ${activeYear === i
                    ? 'border-nebula-1 bg-nebula-1/5'
                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
              >
                <div className={`font-display font-bold text-lg mb-1 transition-colors ${activeYear === i ? 'text-white' : 'text-text-muted'
                  }`}>
                  {item.year}
                </div>
                <div className={`text-sm transition-colors ${activeYear === i ? 'text-nebula-1' : 'text-text-muted'
                  }`}>
                  {item.title}
                </div>
              </button>
            ))}
          </motion.div>

          {/* Right side: Detail View & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-2/3 flex flex-col justify-center"
          >
            <div className="min-h-[200px] mb-12">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-3xl font-display font-medium text-white mb-6">{crises[activeYear].title}</h3>
                <p className="text-text-muted text-lg font-light leading-relaxed">{crises[activeYear].desc}</p>
              </motion.div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {metrics.map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-white text-sm font-medium tracking-wide">{metric.label}</span>
                    <span className="text-nebula-1 font-display font-bold">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-nebula-2 to-nebula-1 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 + 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BacktestingSection;
