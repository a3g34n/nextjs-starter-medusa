"use client"

import { useEffect, useState } from "react"

const categories = [
  { name: "İNDİRİM", sectionId: "section-indirim" },
  { name: "YENİLER", sectionId: "section-yeniler" },
  { name: "KOLEKSİYON", sectionId: "section-koleksiyon" },
]

const CategoryNav = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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
              if (entry.target.id === "section-yeniler") setActiveIndex(1)
              if (entry.target.id === "section-koleksiyon") setActiveIndex(2)
            }
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    )

    const sections = ["section-indirim", "section-yeniler", "section-koleksiyon", "footer"]
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`fixed bottom-16 left-0 right-0 z-40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <nav className="flex items-center justify-center gap-4 md:gap-8">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => handleClick(category.sectionId)}
            className={`text-xs md:text-sm tracking-wider transition-all duration-300 ${
              index === activeIndex
                ? "text-white font-medium scale-110"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default CategoryNav
