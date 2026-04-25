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
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      <AnimatePresence>
        {!isLoading && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
