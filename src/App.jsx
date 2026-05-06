import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BusinessModel from './components/BusinessModel'
import ServicesSection from './components/ServicesSection'
import BacktestingSection from './components/BacktestingSection'
import RiskProtocolsSection from './components/RiskProtocolsSection'
import FAQSection from './components/FAQSection'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import Lenis from '@studio-freight/lenis'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
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
            className="relative min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-white"
          >
            <Navbar />
            <Hero />
            <BusinessModel />
            <ServicesSection />
            <BacktestingSection />
            <RiskProtocolsSection />
            <FAQSection />
            <ProcessSection />
            <Footer />
            <ScrollToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
