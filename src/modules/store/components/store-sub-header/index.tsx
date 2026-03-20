"use client"

import { useHeaderHover } from "@lib/context/header-hover-context"
import { clx } from "@medusajs/ui"
import { useEffect, useRef, useState } from "react"

type StoreSubHeaderProps = {
  children: React.ReactNode
}

export default function StoreSubHeader({ children }: StoreSubHeaderProps) {
  const { isHovered, setSubHeaderHovered } = useHeaderHover()
  const [mobileVisible, setMobileVisible] = useState(true)
  const [scrolledPast, setScrolledPast] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 640) return

      const currentY = window.scrollY

      if (currentY < 10) {
        setMobileVisible(true)
        setScrolledPast(false)
      } else {
        setScrolledPast(true)
        setMobileVisible(currentY < lastScrollY.current)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={clx(
        "sticky top-32 md:top-20 z-40 flex flex-col mb-8 transition-all duration-300",
        // Desktop: hover-based bg
        isHovered ? "small:bg-white" : "small:bg-transparent",
        // Mobile: scroll-based visibility
        mobileVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        // Mobile: white bg when scrolled past top and visible
        scrolledPast && mobileVisible ? "bg-white small:bg-transparent" : "bg-transparent"
      )}
      id="store-sub-header"
      onMouseEnter={() => setSubHeaderHovered(true)}
      onMouseLeave={() => setSubHeaderHovered(false)}
    >
      {children}
    </div>
  )
}
