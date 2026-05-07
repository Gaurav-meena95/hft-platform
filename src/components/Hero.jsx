import React, { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- SHADER FOR ACCRETION DISK ---
const AccretionDisk = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#c8a96e') },
      uColor2: { value: new THREE.Color('#4a8fff') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;

      void main() {
        vec2 uv = vUv - 0.5;
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);
        
        // Spinning noise-like pattern
        float noise = sin(angle * 5.0 + uTime * 2.0) * 0.5 + 0.5;
        noise += sin(angle * 12.0 - uTime * 1.5) * 0.3;
        
        float ring = smoothstep(0.2, 0.21, dist) * smoothstep(0.48, 0.45, dist);
        
        vec3 color = mix(uColor1, uColor2, noise);
        float alpha = ring * (0.6 + noise * 0.4);
        
        // Add glow near event horizon
        float glow = exp(-20.0 * (dist - 0.2));
        color += uColor1 * glow * 0.5;
        alpha += glow * 0.3;

        gl_FragColor = vec4(color, alpha * 0.8);
      }
    `
  }), []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[12, 12]} />
      <shaderMaterial 
        args={[shaderArgs]} 
        transparent 
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const BlackholeCore = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
};

const PhotonSphere = () => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.25, 64, 64]} />
      <meshBasicMaterial 
        color="#c8a96e" 
        transparent 
        opacity={0.3} 
        wireframe
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={15} size={2} speed={0.5} opacity={0.5} color="#c8a96e" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          <BlackholeCore />
          <PhotonSphere />
          <AccretionDisk />
          {/* Outer Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#c8a96e" transparent opacity={0.1} />
          </mesh>
        </group>
      </Float>
      <ambientLight intensity={0.5} />
    </>
  );
};

// --- REACT COMPONENT ---

const Hero = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-32 pb-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      <div className="container mx-auto px-8 relative z-10 max-w-[900px]">
        <motion.span 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase mb-8 block"
        >
          THE ART OF QUANTITATIVE PRECISION
        </motion.span>

        <motion.h1 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-9xl font-light leading-[0.95] tracking-tight text-text-primary mb-10"
        >
          Orion Quant — Where <em className="italic bg-gradient-to-r from-accent to-blue bg-clip-text text-transparent not-italic font-normal">Mathematics</em> Meets the Universe
        </motion.h1>

        <motion.p 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-text-muted font-light leading-relaxed mb-14 max-w-2xl mx-auto"
        >
          Institutional-grade high frequency trading engine where astrophysics meets algorithmic finance. Deploy capital with the speed of light.
        </motion.p>

        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="font-mono text-[12px] tracking-[0.12em] uppercase px-12 py-5 bg-accent text-background rounded-[2px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(200,169,110,0.25)] transition-all duration-300">
            Access Terminal
          </button>
          <button className="font-mono text-[12px] tracking-[0.12em] uppercase px-12 py-5 border border-border text-text-muted hover:border-accent hover:text-text-primary rounded-[2px] transition-all duration-300">
            View Philosophy
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-text-muted uppercase">Explore Cosmos</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;

