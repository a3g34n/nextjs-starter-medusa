"use client"

interface CategoryNavProps {
  activeIndex: number
}

const categories = [
  { name: "İNDİRİM", sectionId: "section-indirim" },
  { name: "YENİLER", sectionId: "section-yeniler" },
  { name: "KOLEKSİYON", sectionId: "section-koleksiyon" },
]

const CategoryNav = ({ activeIndex }: CategoryNavProps) => {
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="flex items-center justify-center gap-8">
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => handleClick(category.sectionId)}
          className={`text-sm tracking-wider transition-all duration-300 ${
            index === activeIndex
              ? "text-white font-medium"
              : "text-white/60 hover:text-white/80"
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  )
}

export default CategoryNav
