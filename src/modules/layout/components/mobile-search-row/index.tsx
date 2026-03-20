"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { clx } from "@medusajs/ui"
import SearchModal from "@modules/search/components/search-modal"

export default function MobileSearchRow({ dictionary }: { dictionary: any }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  const isStorePage = /\/(store|categories)/.test(pathname)

  useEffect(() => {
    setVisible(true)
    lastScrollY.current = 0
  }, [pathname])

  useEffect(() => {
    if (!isStorePage) return

    const handleScroll = () => {
      if (window.innerWidth >= 768) return
      const currentY = window.scrollY
      if (currentY < 10) {
        setVisible(true)
      } else {
        setVisible(currentY < lastScrollY.current)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isStorePage])

  return (
    <div
      className={clx(
        "md:hidden w-full pb-4 px-1 transition-all duration-300",
        isStorePage && !visible && "opacity-0 pointer-events-none -translate-y-2"
      )}
    >
      <SearchModal mobile dictionary={dictionary} />
    </div>
  )
}
