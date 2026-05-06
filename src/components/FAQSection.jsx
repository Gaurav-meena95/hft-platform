import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Does ORION QUANT have access to our capital?",
      a: "No. Non-custodial solution. Capital stays in your own brokerage account always."
    },
    {
      q: "Is technical expertise required?",
      a: "No. ORION QUANT handles full technical setup and ongoing configuration support."
    },
    {
      q: "Connectivity interruptions?",
      a: "Systems run on institutional VPS servers, independent of local internet connection."
    },
    {
      q: "Which exchanges supported?",
      a: "NSE, BSE, MCX with Zerodha, Angel One, and other broker APIs."
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

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-6 flex items-center justify-between group"
              >
                <span className={`text-lg font-medium transition-colors duration-300 ${openIndex === i ? 'text-nebula-1' : 'text-white group-hover:text-nebula-1/70'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`shrink-0 ml-4 transition-colors duration-300 ${openIndex === i ? 'text-nebula-1' : 'text-text-muted group-hover:text-nebula-1/70'}`}
                >
                  <Plus size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-text-muted font-light leading-relaxed pr-12">
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
