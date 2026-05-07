import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StrategySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="strategy" ref={containerRef} className="py-32 px-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6 block">OUR STRATEGY</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-text-primary mb-8">
            The Celestial Engine: Precision in Every Pulsar
          </h2>
          <p className="text-lg text-text-muted font-light leading-relaxed mb-10">
            Our HFT engine operates on the principle of cosmic order. By analyzing market data through the lens of astrophysics-derived algorithms, we identify patterns that others miss. It's not just trading; it's the science of temporal arbitrage.
          </p>
          <div className="flex flex-col gap-6">
            {[
              { title: 'Temporal Symmetry', desc: 'Exploiting micro-second imbalances across exchanges.' },
              { title: 'Gravitational Waves', desc: 'Predicting liquidity shifts before they manifest.' },
              { title: 'Event Horizon Risk', desc: 'Instantaneous circuit breakers at the point of no return.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center font-mono text-accent group-hover:border-accent transition-colors">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right 3D Card */}
        <motion.div 
          style={{ y }}
          className="relative perspective-1000"
        >
          <div className="glass p-12 rounded-[4px] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-48 h-48 mx-auto mb-12">
              <div className="absolute inset-0 border border-border rounded-full" />
              <div className="absolute inset-4 border border-accent/40 rounded-full animate-[spin_6s_linear_infinite]" />
              <div className="absolute inset-8 border border-blue/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
              <div className="absolute inset-[65px] bg-accent/80 rounded-full shadow-[0_0_20px_rgba(200,169,110,0.5)]" />
              
              {/* Orbiting Dot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 origin-[90px] animate-[spin_3s_linear_infinite]" />
            </div>

            <div className="text-center relative z-10">
              <h3 className="font-serif text-3xl font-light text-text-primary mb-4">Autonomous Quant Alpha</h3>
              <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">
                Real-time adaptive learning models that evolve with the market's expanding universe.
              </p>
            </div>
          </div>

          {/* Decorative Background Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue/10 blur-[100px] rounded-full" />
        </motion.div>

      </div>
    </section>
  );
};

export default StrategySection;
