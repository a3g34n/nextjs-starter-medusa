import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import FullscreenSection from "@modules/home/components/fullscreen-section"
import Footer from "@modules/layout/templates/footer"

export const metadata: Metadata = {
  title: "LOUNJSTUDIO | Premium Home & Living",
  description: "Eviniz için premium ev ve yaşam ürünleri. Özel koleksiyonlar ve indirimler.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      {/* Section 1: Video Hero with İNDİRİM */}
      <Hero />

      {/* Section 2: YENİLER - Single Full Image */}
      <FullscreenSection
        sectionId="section-yeniler"
        singleImageSrc="/images/section-2.jpg"
        activeIndex={1}
      />

      {/* Section 3: KOLEKSİYON - Living Room */}
      <FullscreenSection
        sectionId="section-koleksiyon"
        singleImageSrc="/images/section-3.jpg"
        activeIndex={2}
      />

      {/* Section 4: Footer */}
      <Footer />
    </main>
  )
}
