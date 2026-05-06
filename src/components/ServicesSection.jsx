import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "SRHFT Engine",
    "Technical Infrastructure",
    "Backtesting"
  ];

  const tabContents = [
    [
      "Sub-millisecond execution speeds",
      "Direct API access to major exchanges",
      "Advanced algorithmic order routing"
    ],
    [
      "Dedicated institutional VPS setup",
      "Redundant power and network lines",
      "24/7 technical monitoring"
    ],
    [
      "Tick-level historical data access",
      "Custom strategy simulation environments",
      "Real-time analytics dashboard"
    ]
  ];

  return (
    <section id="solutions" className="py-32 bg-background relative z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            Tailored Software Infrastructure
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex gap-6 mb-12 border-b border-border relative">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`pb-4 text-sm font-medium transition-all relative ${
                    activeTab === i 
                      ? 'text-white' 
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-transparent"
              >
                <ul className="space-y-6">
                  {tabContents[activeTab].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center shrink-0">
                        <svg className="w-2 h-2 text-white" viewBox="0 0 14 10" fill="none">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-text-secondary font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Pipeline Diagram */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center bg-transparent border border-border rounded-sm p-8 lg:p-12"
          >
            <div className="flex w-full items-center justify-between relative">
              {/* Connecting lines */}
              <div className="absolute left-0 right-0 h-px top-1/2 -translate-y-1/2 bg-border z-0">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>

              {['Data Sources', 'Processing Logic', 'Platform API', 'Executed'].map((node, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <motion.div 
                    animate={{ boxShadow: ['0 0 0 rgba(0,212,255,0)', '0 0 15px rgba(0,212,255,0.15)', '0 0 0 rgba(0,212,255,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="w-12 h-12 bg-background border border-border rounded flex items-center justify-center relative z-10"
                  >
                    <div className="w-2 h-2 bg-text-secondary rounded-full" />
                  </motion.div>
                  <span className="absolute top-16 text-[10px] text-text-secondary whitespace-nowrap uppercase tracking-wider">{node}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
