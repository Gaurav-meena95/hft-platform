import React from 'react';
import { motion } from 'framer-motion';

const RiskProtocolsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cards = [
    {
      title: "Capital in your control",
      desc: "Your capital stays in your account"
    },
    {
      title: "Hard Equity Stops",
      desc: "Risk limits integrated in code"
    },
    {
      title: "Important Market Events",
      desc: "Rule-based event handling"
    }
  ];

  return (
    <section className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            Safety is not a feature.<br />It is the foundation.
          </h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="p-8 bg-transparent border border-border border-t-[1px] hover:border-t-primary rounded-sm text-left hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-text-secondary font-light">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RiskProtocolsSection;
