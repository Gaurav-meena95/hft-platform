import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import About from './components/About'
import Solutions from './components/Solutions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import Lenis from '@studio-freight/lenis'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // FIX 2: Faster loader duration (800ms + transition)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize Lenis ONLY after loader completes
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
        delete window.lenis;
      }
    }
  }, [isLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      <AnimatePresence>
        {!isLoading && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black"
          >
            <Navbar />
            <Hero />
            
            <Stats />
            <Features />
            
            <About />
            <Solutions />
            
            <Contact />
            <Footer />
            
            <ScrollToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
