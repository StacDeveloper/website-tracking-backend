import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg">
      <div className="dot-grid pointer-events-none absolute inset-0 h-[900px] w-full" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </main>
  )
}

export default HomePage