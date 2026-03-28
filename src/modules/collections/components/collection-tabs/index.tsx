"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { usePathname } from "next/navigation"
import { useRef } from "react"

type CollectionTabsProps = {
  collections: HttpTypes.StoreProductCategory[]
  mobile?: boolean
}

const CollectionTabs = ({ collections, mobile }: CollectionTabsProps) => {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)

  const isActive = (handle: string) => {
    if (!pathname) return false
    return pathname.includes(`/collections/${handle}`)
  }

  const textSize = mobile ? "text-[9px]" : "text-sm"

  const links = (
    <>
      {collections.map((col) => (
        <LocalizedClientLink
          key={col.id}
          href={`/collections/${col.handle}`}
          className={`${textSize} tracking-wider uppercase hover:text-gray-600 transition-colors whitespace-nowrap ${
            isActive(col.handle ?? "")
              ? "border-b border-black pb-1 text-black"
              : "border-b border-transparent pb-1 text-gray-500"
          }`}
        >
          {col.name}
        </LocalizedClientLink>
      ))}
    </>
  )

  if (mobile) {
    return (
      <div
        ref={scrollRef}
        className="flex items-center w-full gap-4 overflow-x-auto py-3"
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

export default CollectionTabs
