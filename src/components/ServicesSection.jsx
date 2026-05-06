import React, { useState, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D ORDER BOOK COMPONENT ---
const OrderBook3D = () => {
  const groupRef = useRef();

  const levels = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const isBuy = i < 12;
      const index = isBuy ? i : i - 12;
      // Spread them out on Y axis, leaving a gap in the middle for the spread
      const y = isBuy ? (index * 0.35) + 0.5 : (-index * 0.35) - 0.5;
      const color = isBuy ? "#22c55e" : "#ef4444";
      return {
        y,
        color,
        baseWidth: Math.random() * 3 + 1,
        isBuy,
        speedOffset: Math.random() * 10
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2 - 0.2;
      groupRef.current.rotation.x = 0.1;

      groupRef.current.children.forEach((child, i) => {
        const level = levels[i];
        // Simulate rapid high-frequency trading changes in order book volume
        const noise = Math.sin(time * 5 + level.speedOffset) * Math.cos(time * 8 + i) * 1.5;
        const width = Math.max(0.2, level.baseWidth + noise);

        child.scale.x = width;
        // Align bars to the center spread line
        child.position.x = level.isBuy ? width / 2 : width / 2;
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[-1, 0, 0]}>
        {/* Center Spread Line (static) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.02, 10, 0.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>

        {/* Animated Order Book Levels */}
        <group ref={groupRef}>
          {levels.map((level, i) => (
            <mesh key={i} position={[0, level.y, 0]}>
              <boxGeometry args={[1, 0.2, 0.5]} />
              <meshBasicMaterial color={level.color} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
};

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "ORION QUANT Engine",
    "Technical Infrastructure",
    "Backtesting & Analytics"
  ];

  const tabContents = [
    [
      "Rule based execution",
      "Traceable processes",
      "Audit logs"
    ],
    [
      "Low latency infra",
      "Co-location ready",
      "99.9% uptime"
    ],
    [
      "Crisis period testing",
      "Simulation analysis",
      "Benchmarking"
    ]
  ];

  return (
    <section id="solutions" className="py-32 bg-surface relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h4 className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            OUR SERVICES
          </h4>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white max-w-3xl leading-tight">
            Tailored Software Infrastructure for Corporate Capital
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: Tabs and Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 mb-8 relative">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold tracking-[0.1em] uppercase transition-colors relative ${activeTab === i ? 'text-nebula-1' : 'text-text-muted hover:text-white'
                    }`}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div
                      layoutId="serviceTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-nebula-1 shadow-[0_0_10px_rgba(0,212,255,0.8)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {tabContents[activeTab].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg">
                      <div className="w-6 h-6 rounded-full bg-nebula-1/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-nebula-1" />
                      </div>
                      <span className="text-white font-light">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: 3D Market Depth / Order Book Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 h-[400px] bg-black/30 border border-white/5 rounded backdrop-blur-sm flex items-center justify-center relative"
          >
            <div className="absolute top-4 left-6 z-10 flex flex-col gap-1">
              <span className="text-white text-xs font-bold tracking-widest uppercase">Live Market Depth</span>
              <span className="text-nebula-1 text-[10px] font-mono">HFT Order Book Simulation</span>
            </div>
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <OrderBook3D />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
