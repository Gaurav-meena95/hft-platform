import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import GlobalBackground from './components/GlobalBackground';
import Hero from './components/Hero';
import BlackholeSection from './components/BlackholeSection';
import BusinessModel from './components/BusinessModel';
import ServicesSection from './components/ServicesSection';
import BacktestingSection from './components/BacktestingSection';
import RiskProtocolsSection from './components/RiskProtocolsSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen">
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero />
        <BlackholeSection />
        <BusinessModel />
        <ServicesSection />
        <BacktestingSection />
        <RiskProtocolsSection />
        <ProcessSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
