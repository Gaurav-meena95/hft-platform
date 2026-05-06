import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlackHole = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} rotation={[Math.PI / 3, 0, 0]}>

        {/* Deep Field Sparkles getting pulled into blackhole */}
        <Sparkles count={300} scale={15} size={3} speed={0.8} opacity={0.5} color="#f59e0b" />
        <Sparkles count={200} scale={12} size={2} speed={1.2} opacity={0.3} color="#7c3aed" />

        {/* Event Horizon */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Distorted Core Edge */}
        <mesh>
          <sphereGeometry args={[2.05, 64, 64]} />
          <MeshDistortMaterial color="#f59e0b" distort={0.2} speed={3} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Accretion Disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 1.5, 32, 100]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Lensing Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[6, 0.1, 16, 100]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.1, 0]}>
          <torusGeometry args={[7, 0.05, 16, 100]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <BlackHole />
    </>
  );
};

const BlackholeSection = () => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const el = canvasContainerRef.current;

    gsap.fromTo(el,
      { scale: 0.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* 3D Canvas */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center pointer-events-none">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
          Speed Beyond<br />Human Perception
        </h2>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-md">
          Execution in microseconds. Where every millisecond defines the edge.
        </p>
      </div>

    </section>
  );
};

export default BlackholeSection;
