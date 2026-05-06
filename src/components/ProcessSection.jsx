import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const WorkflowChart3D = () => {
  const lineRef = useRef();

  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-3, -1.5, 0),
      new THREE.Vector3(-1.5, -0.5, -1),
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(1.5, 0.5, 1),
      new THREE.Vector3(3, 2, 0),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={lineRef}>
        {/* Glowing Trend Line */}
        <mesh>
          <tubeGeometry args={[curve, 64, 0.06, 8, false]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Process Nodes on the line */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const pt = curve.getPointAt(t);
          return (
            <mesh key={i} position={[pt.x, pt.y, pt.z]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial color="#00d4ff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    { num: "01", title: "Initial Call", desc: "Requirements analysis and scope definition." },
    { num: "02", title: "Test Phase", desc: "Risk-free validation and performance evaluation." },
    { num: "03", title: "Technical Walkthrough", desc: "Architecture deep dive and API integration review." },
    { num: "04", title: "Decision & Contract", desc: "Flexible licensing and commercial terms finalization." },
    { num: "05", title: "Installation", desc: "Setup in your institutional environment." },
    { num: "06", title: "Go-Live", desc: "System activation and real-time monitoring." },
    { num: "07", title: "Ongoing Support", desc: "Updates, maintenance, and latency optimization." }
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
    <section id="technology" className="py-32 bg-surface relative z-10 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <h4 className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            PROCESS / WORKFLOW
          </h4>
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
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10 z-0 hidden md:block" />

            <div className="flex flex-col gap-6 relative z-10">
              {steps.map((step, i) => (
                <div key={i}>
                  {/* Desktop view */}
                  <button
                    onClick={() => setActiveStep(i)}
                    className="hidden md:flex items-center gap-6 group w-full text-left"
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 bg-surface ${activeStep === i
                        ? 'border-nebula-1 shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                        : activeStep > i
                          ? 'border-white/30'
                          : 'border-white/10'
                      }`}>
                      <span className={`text-[10px] font-bold ${activeStep === i ? 'text-nebula-1' : activeStep > i ? 'text-white/50' : 'text-text-muted'}`}>
                        {step.num}
                      </span>
                    </div>
                    <span className={`text-sm font-medium uppercase tracking-widest transition-all duration-300 ${activeStep === i
                        ? 'text-white'
                        : 'text-text-muted group-hover:text-white/70'
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
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${activeStep === i ? 'border-nebula-1 bg-nebula-1/10' : 'border-white/10 bg-surface'
                        }`}>
                        <span className={`text-xs font-bold ${activeStep === i ? 'text-nebula-1' : 'text-text-muted'}`}>
                          {step.num}
                        </span>
                      </div>
                      <span className={`text-sm font-medium uppercase tracking-widest ${activeStep === i ? 'text-white' : 'text-text-muted'}`}>
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
                          className="pl-12 pb-4 text-text-muted font-light text-sm"
                        >
                          {step.desc}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Cyan Line overlay for desktop */}
            <div
              className="hidden md:block absolute left-[15px] top-4 w-px bg-nebula-1 transition-all duration-500 ease-out z-0 shadow-[0_0_10px_rgba(0,212,255,0.6)]"
              style={{ height: `calc(${activeStep * (100 / (steps.length - 1))}% - 16px)` }}
            />
          </motion.div>

          {/* Right Column: Content (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex md:w-2/3 relative items-center justify-center bg-black/50 border border-white/5 rounded backdrop-blur-sm overflow-hidden"
          >
            {/* 3D Stock Trend Background */}
            <div className="absolute inset-0 z-0 opacity-40">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <WorkflowChart3D />
                </Canvas>
              </Suspense>
            </div>

            {/* Text Content overlaying the 3D line */}
            <div className="relative z-10 p-12 lg:p-24 w-full h-full flex flex-col justify-center bg-gradient-to-r from-black/80 to-transparent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-lg"
                >
                  <div className="text-nebula-1 text-sm font-bold tracking-[0.2em] mb-6 uppercase">Step {steps[activeStep].num}</div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-text-muted text-lg font-light leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
