import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'

function App() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      
      <Stats />
      <Features />
      
      <footer className="py-20 border-t border-white/5 bg-black relative z-10">
        <div className="container mx-auto px-6 text-center text-text-secondary">
          <p className="text-sm tracking-widest uppercase">© 2026 SRHFT SOLUTIONS PVT LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default App
