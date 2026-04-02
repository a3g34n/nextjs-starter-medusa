"use client"

import { useState, useEffect } from "react"

const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <section id="section-indirim" className="h-screen w-full relative overflow-hidden snap-start">
      {/* Fallback gradient shown until JS determines which video to load */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 -z-10" />

      {/* Only one video is ever mounted — no double-fetch */}
      {isMobile === false && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster="https://media.lounjstudio.com/home/hero-poster.webp"
        >
          <source src="https://media.lounjstudio.com/home/hero_video_hq.mp4" type="video/mp4" />
        </video>
      )}

      {isMobile === true && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster="https://media.lounjstudio.com/home/hero-poster-mobile.webp"
        >
          <source src="https://media.lounjstudio.com/home/hero_video_mobile_hq.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}

export default Hero
