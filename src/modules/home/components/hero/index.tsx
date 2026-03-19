"use client"


const Hero = () => {
  return (
    <section id="section-indirim" className="h-screen w-full relative overflow-hidden snap-start">
      {/* Desktop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Mobile Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
        poster="/hero-poster-mobile.jpg"
      >
        <source src="/hero-video-mobile.mp4" type="video/mp4" />
        <source src="/hero-video-mobile.webm" type="video/webm" />
      </video>

      {/* Fallback gradient background if no video */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 -z-10" />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      
    </section>
  )
}

export default Hero
