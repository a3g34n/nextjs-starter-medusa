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

      <div className="absolute bottom-8 left-0 right-0 z-10 pointer-events-none">
        <p className="text-center text-white/70 text-xs mb-4 px-4">
          İndirim 1 Ocak 20:00&apos;da online&apos;da başlayıp 2 Mart&apos;ta bitiyor. İndirim seçili ürünlerde stoklarla sınırlıdır.
        </p>
      </div>
    </section>
  )
}

export default Hero
