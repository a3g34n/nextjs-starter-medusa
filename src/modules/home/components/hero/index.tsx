"use client"

import CategoryNav from "@modules/home/components/category-nav"

const Hero = () => {
  return (
    <section id="section-indirim" className="h-screen w-full relative overflow-hidden snap-start">
      {/* Video Background - Replace with your video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
      >
        {/* Add your video sources here */}
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Fallback gradient background if no video */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 -z-10" />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-[#c4b590] uppercase">
          İNDİRİM
        </h1>
      </div>

      {/* Bottom Category Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <p className="text-center text-white/70 text-xs mb-4 px-4">
          İndirim 1 Ocak 20:00'da online'da başlayıp 2 Mart'ta bitiyor. İndirim seçili ürünlerde stoklarla sınırlıdır.
        </p>
        <CategoryNav activeIndex={0} />
      </div>
    </section>
  )
}

export default Hero
