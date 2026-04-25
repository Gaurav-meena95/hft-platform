import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GlowEffect from './components/GlowEffect'
import { FadeInUp } from './components/Animations'

function App() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black">
      <GlowEffect />
      <Navbar />
      
      <Hero />

      {/* Placeholder for future phases */}
      <section className="py-32 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <FadeInUp>
            <div className="glass p-12 md:p-20 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />
              
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                  Next-Level Infrastructure for the <span className="text-primary italic">Modern Trader.</span>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Our systems are optimized for micro-second precision, ensuring your strategies execute exactly when they need to.
                </p>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group hover:border-primary/50 transition-colors duration-500">
                    <div className="w-12 h-12 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center text-text-secondary">
          <p>© 2026 SRHFT SOLUTIONS PVT LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default App
