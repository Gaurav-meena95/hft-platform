import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Activity } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const ProtectiveShield = () => {
  const chartRef = useRef();
  
  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group position={[0, -1, 0]}>
        {/* Protective Forcefield Dome */}
        <mesh>
          <sphereGeometry args={[2.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.15} />
        </mesh>
        {/* Solid Base */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[2.8, 2.8, 0.1, 64]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* Inner Protected Stock Chart */}
        <group ref={chartRef} position={[0, 0.2, 0]}>
          {/* Green Uptrend Candles */}
          <mesh position={[-1.2, 0.5, 0]}>
            <boxGeometry args={[0.3, 1, 0.3]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
          </mesh>
          <mesh position={[-0.4, 0.8, 0]}>
            <boxGeometry args={[0.3, 1.6, 0.3]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.4, 1.3, 0]}>
            <boxGeometry args={[0.3, 2.6, 0.3]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
          </mesh>
          
          {/* Red Downtrend Candle blocked by shield edge */}
          <mesh position={[1.8, 0.3, 0]}>
            <boxGeometry args={[0.3, 0.6, 0.3]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

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
      icon: <Lock size={28} className="text-nebula-1 mb-6" />,
      title: "Capital in your control",
      desc: "Your capital stays in your account"
    },
    {
      icon: <Shield size={28} className="text-nebula-1 mb-6" />,
      title: "Hard Equity Stops",
      desc: "Risk limits integrated in code"
    },
    {
      icon: <Activity size={28} className="text-nebula-1 mb-6" />,
      title: "Market Event Handling",
      desc: "Rule-based event handling"
    }
  ];

  return (
    <section className="py-32 bg-surface relative z-10 overflow-hidden">
      
      {/* 3D Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[800px] h-[600px] z-0 opacity-40 lg:opacity-60 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <ProtectiveShield />
          </Canvas>
        </Suspense>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 max-w-2xl"
        >
          <h4 className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            RISK PROTOCOLS
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight">
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
              className="p-10 bg-black/40 backdrop-blur-md border border-white/10 text-left transition-all duration-300 relative group overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
            >
              {/* Cyan top border on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-nebula-1 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              {card.icon}
              <h3 className="text-xl font-display font-medium text-white mb-3">{card.title}</h3>
              <p className="text-text-muted font-light">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RiskProtocolsSection;
