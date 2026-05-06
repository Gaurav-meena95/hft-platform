import React, { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- THREE.JS COMPONENTS ---

const Globe = () => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
};

const BlackholeRing = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  useFrame(() => {
    if (ring1.current) {
      ring1.current.rotation.z -= 0.002;
      ring1.current.rotation.x = Math.PI / 2 - 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z += 0.003;
      ring2.current.rotation.x = Math.PI / 2 - 0.2;
      ring2.current.rotation.y = 0.1;
    }
  });
  return (
    <group position={[0, 0, -1]}>
      <mesh ref={ring1}>
        <torusGeometry args={[3.2, 0.4, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring2} scale={1.1}>
        <torusGeometry args={[3.2, 0.1, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const Candlesticks = () => {
  const groupRef = useRef();

  const sticks = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = (i / 15) * Math.PI * 1.2 - Math.PI * 0.6;
      const radius = 3.5;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const height = Math.random() * 0.8 + 0.2;
      const isGreen = Math.random() > 0.5;
      return { x, z, height, isGreen, offset: Math.random() * Math.PI * 2 };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (sticks[i]) {
          child.position.y = Math.sin(time * 1.5 + sticks[i].offset) * 0.3;
        }
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {sticks.map((stick, i) => (
          <group key={i} position={[stick.x, 0, stick.z]} rotation={[0, -Math.atan2(stick.x, stick.z), 0]}>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.15, stick.height, 0.15]} />
              <meshBasicMaterial color={stick.isGreen ? "#22c55e" : "#ef4444"} transparent opacity={0.8} />
            </mesh>
            {/* Wick */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.02, stick.height + 0.4, 0.02]} />
              <meshBasicMaterial color={stick.isGreen ? "#22c55e" : "#ef4444"} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

const TickerRibbons = () => {
  const groupRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Text position={[0, 1.8, 2.5]} rotation={[0, 0, 0]} fontSize={0.25} color="#00d4ff" anchorX="center" anchorY="middle" material-toneMapped={false} fillOpacity={0.9}>
        NIFTY 22,450 ▲ 0.34%
      </Text>
      <Text position={[2.5, 0, -1.5]} rotation={[0, -Math.PI / 3, 0]} fontSize={0.25} color="#7c3aed" anchorX="center" anchorY="middle" material-toneMapped={false} fillOpacity={0.9}>
        SENSEX 74,120 ▲ 0.21%
      </Text>
      <Text position={[-2.5, -1.8, 1.5]} rotation={[0, Math.PI / 4, 0]} fontSize={0.25} color="#f59e0b" anchorX="center" anchorY="middle" material-toneMapped={false} fillOpacity={0.9}>
        BANKNIFTY 48,230 ▼ 0.12%
      </Text>
    </group>
  );
};

const MagicParticles = () => {
  return (
    <>
      <Stars radius={10} depth={50} count={2000} factor={4} saturation={0} fade speed={1.5} />
      <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.6} color="#00d4ff" />
      <Sparkles count={100} scale={12} size={3} speed={0.2} opacity={0.4} color="#7c3aed" />
    </>
  );
};

const CameraRig = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
      <Globe />
      <BlackholeRing />
      <Candlesticks />
      <TickerRibbons />
      <MagicParticles />
    </>
  );
};

// --- REACT COMPONENT ---

const Hero = () => {
  const line1 = "A Structured Approach to".split(" ");
  const line2 = "High Frequency Trading".split(" ");

  const wordAnim = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const tickerText = "10ms Latency · 99.9% Uptime · 500+ Clients · NSE · BSE · MCX · NIFTY 22,450 ▲ · SENSEX 74,120 ▲ · BANKNIFTY 48,230 ▼ · ";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">

          {/* LEFT SIDE: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-nebula-1 text-xs font-bold tracking-[0.3em] uppercase mb-6"
            >
              Institutional Grade HFT
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-[1.1] tracking-tight">
              <div className="flex flex-wrap gap-x-3 mb-2">
                {line1.map((word, i) => (
                  <motion.div key={i} variants={wordAnim} initial="hidden" animate="visible" className="inline-block text-text-muted" style={{ display: 'inline-block' }}>
                    {word}
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3">
                {line2.map((word, i) => (
                  <motion.div key={i} variants={wordAnim} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="inline-block text-white" style={{ display: 'inline-block' }}>
                    {word}
                  </motion.div>
                ))}
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-text-muted text-lg max-w-xl mb-12 font-light leading-relaxed"
            >
              ORION QUANT Engine enables structured and controlled execution on client-owned accounts across NSE, BSE and MCX with ultra-low latency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-16 w-full"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-nebula-1 text-black font-bold tracking-wider uppercase text-sm rounded hover:bg-white transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
              >
                Request First Call
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('solutions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-nebula-1 text-nebula-1 font-bold tracking-wider uppercase text-sm rounded hover:bg-nebula-1 hover:text-black transition-colors w-full sm:w-auto"
              >
                View Solutions
              </button>
            </motion.div>

            {/* Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl"
            >
              <div className="p-5 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-sm text-left flex items-start gap-4 hover:border-nebula-1/50 transition-colors">
                <Shield className="text-nebula-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-medium mb-1 text-sm">Capital Protection</h3>
                  <p className="text-text-muted text-xs">Customizable risk management</p>
                </div>
              </div>
              <div className="p-5 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-sm text-left flex items-start gap-4 hover:border-nebula-1/50 transition-colors">
                <Zap className="text-nebula-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-medium mb-1 text-sm">Instant Deployment</h3>
                  <p className="text-text-muted text-xs">Simple system integration</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: 3D Canvas */}
          <div className="w-full lg:w-1/2 h-[400px] lg:h-[700px] mt-12 lg:mt-0 relative z-10">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-nebula-1 text-sm tracking-widest uppercase">Initializing Systems...</div>}>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Scene />
              </Canvas>
            </Suspense>
          </div>

        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-surface border-t border-white/10 py-3 z-20">
        <div className="flex whitespace-nowrap animate-ticker text-sm font-display tracking-widest">
          {[...Array(6)].map((_, index) => (
            <span key={index} className="px-4">
              {tickerText.split('·').map((part, i) => (
                <React.Fragment key={i}>
                  <span className={part.includes('▲') || part.includes('▼') || part.match(/\d+ms|\d+\.\d+%|\d+\+/) ? 'text-nebula-1' : 'text-white'}>
                    {part}
                  </span>
                  {i < tickerText.split('·').length - 1 && <span className="text-white/30 mx-2">·</span>}
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
