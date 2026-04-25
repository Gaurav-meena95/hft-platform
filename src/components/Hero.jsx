import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeInUp, StaggerChildren } from './Animations';

const TickerItem = ({ label, value }) => (
  <div className="flex flex-col items-center px-8 border-r border-white/10 last:border-none">
    <span className="text-primary font-display font-bold text-2xl md:text-3xl">{value}</span>
    <span className="text-text-secondary text-sm uppercase tracking-widest">{label}</span>
  </div>
);

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 relative z-10 text-center pt-32 pb-20">
        <StaggerChildren delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Trading at the speed of light
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-white mb-8 leading-[0.9]">
            Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]">
              Performance
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Harness the power of ultra-low latency execution and advanced algorithmic strategies. Engineered for the most demanding financial markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]">
              <span className="relative z-10">Start Trading</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
              Explore Solutions
            </button>
          </div>
        </StaggerChildren>
      </div>

      {/* Numbers Ticker - Now relatively positioned at bottom of flex container */}
      <div className="w-full border-y border-white/5 bg-black/50 backdrop-blur-md py-12 mb-12">
        <FadeInUp delay={1}>
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-y-8 md:gap-y-0">
            <TickerItem value="10ms" label="Latency" />
            <TickerItem value="99.9%" label="Uptime" />
            <TickerItem value="500+" label="Global Clients" />
            <TickerItem value="$2.4B" label="Volume Daily" />
          </div>
        </FadeInUp>
      </div>

      {/* Custom Styles for Gradient Animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
