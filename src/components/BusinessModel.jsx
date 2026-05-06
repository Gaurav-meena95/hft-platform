import React from 'react';
import { motion } from 'framer-motion';

const BusinessModel = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const columns = [
    {
      label: "SRHFT",
      title: "Core Infrastructure",
      desc: "We provide the high-performance trading engine and low-latency exchange connectivity."
    },
    {
      label: "YOU",
      title: "Capital Control",
      desc: "Your funds remain securely in your own institutional or retail brokerage accounts."
    },
    {
      label: "AUTO",
      title: "Automated Execution",
      desc: "Strategies run autonomously, executing trades with microsecond precision 24/7."
    }
  ];

  return (
    <section id="about" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 max-w-3xl"
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 tracking-tight leading-tight">
            We provide the engine.<br />You stay in control.
          </h2>
          <p className="text-text-secondary text-lg md:text-xl font-light">
            Our platform bridges the gap between institutional technology and private capital, offering unparalleled speed without compromising security.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {columns.map((col, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="pt-6 border-t border-border flex flex-col items-start"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-6">
                {col.label}
              </span>
              <h3 className="text-2xl font-display font-medium text-white mb-4 tracking-tight">{col.title}</h3>
              <p className="text-text-secondary font-light leading-relaxed">{col.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessModel;
