import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    { num: "01", title: "Initial Call", desc: "We discuss your current setup, trading volume, and specific infrastructure requirements." },
    { num: "02", title: "Optional Test Phase", desc: "Access a sandboxed environment to backtest and verify our latency claims against your own data." },
    { num: "03", title: "Technical Walkthrough", desc: "Our engineers review the API documentation and deployment process with your technical team." },
    { num: "04", title: "Decision & Contract", desc: "Finalize service level agreements and commercial terms based on your required capacity." },
    { num: "05", title: "Installation & Setup", desc: "We provision dedicated hardware and configure your customized trading environment." },
    { num: "06", title: "Go-Live", desc: "Coordinated launch sequence with our engineers monitoring the first live trading sessions." },
    { num: "07", title: "Ongoing Support", desc: "24/7 technical support and continuous latency optimization for your infrastructure." }
  ];

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, steps.length]);

  return (
    <section id="contact" className="py-32 bg-background relative z-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            The Process
          </h2>
        </motion.div>

        <div 
          className="flex flex-col md:flex-row gap-16 md:gap-32"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Vertical Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/3 relative"
          >
            {/* Background Line */}
            <div className="hidden md:block absolute left-[15px] top-4 bottom-4 w-px bg-border z-0" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {steps.map((step, i) => (
                <div key={i}>
                  {/* Desktop view */}
                  <button
                    onClick={() => setActiveStep(i)}
                    className="hidden md:flex items-center gap-6 group w-full text-left"
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 bg-background ${
                      activeStep === i 
                        ? 'border-primary shadow-[0_0_15px_rgba(0,212,255,0.3)]' 
                        : activeStep > i 
                          ? 'border-white/30' 
                          : 'border-border'
                    }`}>
                      <span className={`text-[10px] font-bold ${activeStep === i ? 'text-primary' : activeStep > i ? 'text-white/50' : 'text-text-secondary'}`}>
                        {step.num}
                      </span>
                    </div>
                    <span className={`text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
                      activeStep === i 
                        ? 'text-white' 
                        : 'text-text-secondary group-hover:text-white/70'
                    }`}>
                      {step.title}
                    </span>
                  </button>

                  {/* Mobile view (Accordion style) */}
                  <div className="md:hidden">
                    <button
                      onClick={() => setActiveStep(i)}
                      className="flex items-center gap-4 w-full text-left py-2"
                    >
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        activeStep === i ? 'border-primary bg-primary/10' : 'border-border bg-background'
                      }`}>
                        <span className={`text-xs font-bold ${activeStep === i ? 'text-primary' : 'text-text-secondary'}`}>
                          {step.num}
                        </span>
                      </div>
                      <span className={`text-sm font-medium uppercase tracking-widest ${activeStep === i ? 'text-white' : 'text-text-secondary'}`}>
                        {step.title}
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-12 pb-4 text-text-secondary font-light text-sm"
                        >
                          {step.desc}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Animated Blue Line overlay for desktop */}
            <div 
              className="hidden md:block absolute left-[15px] top-4 w-px bg-primary transition-all duration-500 ease-out z-0 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
              style={{ height: `calc(${activeStep * (100 / (steps.length - 1))}% - 16px)` }}
            />
          </motion.div>

          {/* Right Column: Content (Desktop only) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex md:w-2/3 items-center justify-center bg-transparent border border-border p-12 lg:p-24 rounded-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-lg"
              >
                <div className="text-primary text-sm font-bold tracking-widest mb-6 uppercase">Step {steps[activeStep].num}</div>
                <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">
                  {steps[activeStep].title}
                </h3>
                <p className="text-text-secondary text-lg font-light leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
