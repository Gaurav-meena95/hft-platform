import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const EngineCore = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Inner Core */}
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
        </mesh>
        {/* Outer Frame */}
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.15} />
        </mesh>
        {/* Central glowing point */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </Float>
  );
};

const BusinessModel = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-32 bg-background relative z-10 overflow-hidden">

      {/* Subtle 3D Background Element */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 opacity-40 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <EngineCore />
          </Canvas>
        </Suspense>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 max-w-2xl"
        >
          <h4 className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            BUSINESS MODEL
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight">
            We provide the engine.<br />You stay in control.
          </h2>
          <p className="text-text-muted text-lg font-light">
            Our infrastructure is designed for institutions and high net-worth individuals who demand transparency, security, and absolute control over their capital.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Column 1 */}
          <motion.div variants={item} className="border-t border-nebula-1 pt-8 bg-black/20 backdrop-blur-sm p-6 rounded-sm border-x border-b border-white/5">
            <h3 className="text-nebula-1 text-sm font-bold tracking-[0.2em] uppercase mb-4">ORION QUANT</h3>
            <h4 className="text-2xl font-display font-medium text-white mb-4">We provide the software</h4>
            <p className="text-text-muted font-light leading-relaxed">
              We develop and maintain the technical foundation. You receive a license, system components, and full technical support.
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={item} className="border-t border-nebula-1 pt-8 bg-black/20 backdrop-blur-sm p-6 rounded-sm border-x border-b border-white/5">
            <h3 className="text-nebula-1 text-sm font-bold tracking-[0.2em] uppercase mb-4">YOU</h3>
            <h4 className="text-2xl font-display font-medium text-white mb-4">You own the account</h4>
            <p className="text-text-muted font-light leading-relaxed">
              Software runs on your own broker account. All capital remains fully under your control. ORION QUANT has no access to funds.
            </p>
          </motion.div>

          {/* Column 3 */}
          <motion.div variants={item} className="border-t border-nebula-1 pt-8 bg-black/20 backdrop-blur-sm p-6 rounded-sm border-x border-b border-white/5">
            <h3 className="text-nebula-1 text-sm font-bold tracking-[0.2em] uppercase mb-4">AUTO</h3>
            <h4 className="text-2xl font-display font-medium text-white mb-4">Automated Execution</h4>
            <p className="text-text-muted font-light leading-relaxed">
              Once activated, system executes predefined rules automatically. No manual trading required.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessModel;
