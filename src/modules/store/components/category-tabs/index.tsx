"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { usePathname } from "next/navigation"
import { useRef } from "react"

type CategoryTabsProps = {
  categories: HttpTypes.StoreProductCategory[]
  mobile?: boolean
}

const CategoryTabs = ({ categories, mobile }: CategoryTabsProps) => {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)

  const isActive = (handle: string) => {
    if (!pathname) return false
    if (handle === "store") return pathname.endsWith("/store")
    return pathname.includes(`/categories/${handle}`)
  }

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" })
    }
  }

  const links = (
    <>
      <LocalizedClientLink
        href="/store"
        className={`text-xs tracking-widest uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
          isActive("store") ? "border-b border-black pb-1 text-black" : "border-b border-transparent pb-1 text-gray-500"
        }`}
      >
        TÜMÜNÜ GÖRÜNTÜLE
      </LocalizedClientLink>
      {categories.map((c) => (
        <LocalizedClientLink
          key={c.id}
          href={`/categories/${c.handle}`}
          className={`text-xs tracking-widest uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
            isActive(c.handle) ? "border-b border-black pb-1 text-black" : "border-b border-transparent pb-1 text-gray-500"
          }`}
        >
          {c.name}
        </LocalizedClientLink>
      ))}
    </>
  )

  if (mobile) {
    return (
      <div className="flex items-center w-full">
        <button
          onClick={() => scroll("left")}
          className="flex-shrink-0 px-2 text-gray-400 hover:text-gray-700"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex items-center gap-5 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {links}
        </div>
        <button
          onClick={() => scroll("right")}
          className="flex-shrink-0 px-2 text-gray-400 hover:text-gray-700"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center gap-6 py-4 mb-2 overflow-x-auto">
      {links}
    </div>
  )
}

export default CategoryTabs
