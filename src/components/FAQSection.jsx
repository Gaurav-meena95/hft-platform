import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Does SRHFT have access to our capital?",
      a: "No. Your capital remains in your own brokerage account. Our software engine connects via API strictly for execution purposes, with no withdrawal permissions."
    },
    {
      q: "Is technical expertise required?",
      a: "No. SRHFT supports full technical setup and configuration. We provide end-to-end deployment and ongoing technical monitoring."
    },
    {
      q: "How does the system behave during connectivity issues?",
      a: "Systems run on institutional VPS servers, independent of local connections. In case of exchange disconnection, hard-coded safety protocols immediately halt trading and cancel open orders."
    }
  ];

  return (
    <section className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            Common Questions
          </h2>
        </motion.div>

        <div className="flex flex-col border-t border-border">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="border-b border-border"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-6 flex items-center justify-between group"
              >
                <span className={`text-lg font-medium transition-colors duration-300 ${openIndex === i ? 'text-primary' : 'text-white group-hover:text-primary/70'}`}>
                  {faq.q}
                </span>
                <motion.div 
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`shrink-0 ml-4 transition-colors duration-300 ${openIndex === i ? 'text-primary' : 'text-text-secondary group-hover:text-primary/70'}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {openIndex === i ? (
                      <line x1="5" y1="12" x2="19" y2="12" />
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </>
                    )}
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="pb-6 text-text-secondary font-light leading-relaxed pr-12">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
