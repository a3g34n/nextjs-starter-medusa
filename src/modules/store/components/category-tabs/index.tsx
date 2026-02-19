"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { usePathname } from "next/navigation"

type CategoryTabsProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  const pathname = usePathname()

  // Helper to check active state safely regardless of locale prefix
  const isActive = (handle: string) => {
      if (!pathname) return false
      // For "All" (/store)
      if (handle === "store") {
          return pathname.endsWith("/store")
      }
      // For Categories
      return pathname.includes(`/categories/${handle}`)
  }

  return (
    <div className="flex justify-center items-center gap-6 py-4 mb-2 overflow-x-auto">
      <LocalizedClientLink
        href="/store"
        className={`text-xs tracking-widest uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
          isActive("store") ? "border-b border-black pb-1 text-black" : "text-gray-500"
        }`}
      >
        TÜMÜNÜ GÖRÜNTÜLE
      </LocalizedClientLink>
      
      {categories.map((c) => (
        <LocalizedClientLink
          key={c.id}
          href={`/categories/${c.handle}`}
          className={`text-xs tracking-widest uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
            isActive(c.handle) ? "border-b border-black pb-1 text-black" : "text-gray-500"
          }`}
        >
          {c.name}
        </LocalizedClientLink>
      ))}
    </div>
  )
}

export default CategoryTabs
