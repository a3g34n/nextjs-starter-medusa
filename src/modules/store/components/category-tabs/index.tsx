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
        className={`text-[9px] tracking-wider uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
          isActive("store") ? "border-b border-black pb-1 text-black" : "border-b border-transparent pb-1 text-gray-500"
        }`}
      >
        TÜMÜNÜ GÖRÜNTÜLE
      </LocalizedClientLink>
      {categories.map((c) => (
        <LocalizedClientLink
          key={c.id}
          href={`/categories/${c.handle}`}
          className={`text-[9px] tracking-wider uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
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
      <div
        ref={scrollRef}
        className="flex items-center justify-between w-full gap-4 overflow-x-auto py-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {links}
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
