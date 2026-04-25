import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      
      {/* 
        Remaining phases will be added here. 
        Phase 2 is now complete with all specific requirements.
      */}
      
      <footer className="py-20 border-t border-white/5 bg-black relative z-10">
        <div className="container mx-auto px-6 text-center text-text-secondary">
          <p className="text-sm tracking-widest uppercase">© 2026 SRHFT SOLUTIONS PVT LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default App
