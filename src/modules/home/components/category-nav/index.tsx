"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

const CategoryNav = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const params = useParams()
  const countryCode = params?.countryCode as string

  const handleMagazaClick = () => {
    router.push(`/${countryCode}/store`)
  }

  const handleKisisellestirmeClick = () => {
    router.push(`/${countryCode}/collections/kisisellestirme`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if footer is visible
            if (entry.target.id === "footer") {
              setIsVisible(false)
            } else {
              setIsVisible(true)
              // Update active index based on section
              if (entry.target.id === "section-indirim") setActiveIndex(0)
              if (entry.target.id === "section-koleksiyon") setActiveIndex(1)
            }
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    )

    const sections = ["section-indirim", "section-koleksiyon", "footer"]
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`fixed bottom-16 left-0 right-0 z-40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <nav className="flex items-center justify-center gap-4 md:gap-8">
        <button
          onClick={handleMagazaClick}
          className={`text-xs md:text-sm tracking-wider transition-all duration-300 ${
            0 === activeIndex
              ? "text-white font-medium scale-110"
              : "text-white/60 hover:text-white/80"
          }`}
        >
          MAĞAZAYI KEŞFET
        </button>
        <button
          onClick={handleKisisellestirmeClick}
          className={`text-xs md:text-sm tracking-wider transition-all duration-300 ${
            1 === activeIndex
              ? "text-white font-medium scale-110"
              : "text-white/60 hover:text-white/80"
          }`}
        >
          KENDİ ÜRÜNÜNÜ OLUŞTUR
        </button>
      </nav>
    </div>
  )
}

export default CategoryNav
