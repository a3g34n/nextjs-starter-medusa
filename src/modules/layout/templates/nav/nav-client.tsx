"use client"

import { usePathname } from "next/navigation"
import { clx } from "@medusajs/ui"
import { useHeaderHover } from "@lib/context/header-hover-context"
import { useEffect, useRef, useState } from "react"

const ANNOUNCEMENTS = [
  "WELCOME15 KODUYLA %15 İNDİRİM · İLK ALIŞVERİŞE ÖZEL",
  "3.000 TL VE ÜZERİNE KARGO ÜCRETSİZ",
]

function AnnouncementBanner() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % ANNOUNCEMENTS.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-white text-black text-center py-2 px-4 text-[10px] sm:text-xs tracking-widest font-medium uppercase overflow-hidden">
      <span
        style={{
          display: "inline-block",
          transition: "opacity 0.4s ease",
          opacity: visible ? 1 : 0,
          textDecoration: "underline",
        }}
      >
        {ANNOUNCEMENTS[index]}
      </span>
    </div>
  )
}

export default function NavClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isHovered, setNavHovered } = useHeaderHover()
  const [searchRowVisible, setSearchRowVisible] = useState(true)
  const [mobileScrolledPast, setMobileScrolledPast] = useState(false)
  const lastScrollY = useRef(0)

  const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname)
  const isProductPage = /^\/[a-z]{2}\/products\/[^/]+/.test(pathname)
  const isStorePage = /\/(store|categories|collections)/.test(pathname)

  useEffect(() => {
    setSearchRowVisible(true)
    setMobileScrolledPast(false)
    lastScrollY.current = 0
  }, [pathname])

  useEffect(() => {
    if (!isStorePage) return

    const handleScroll = () => {
      if (window.innerWidth >= 768) return
      const currentY = window.scrollY
      if (currentY < 10) {
        setSearchRowVisible(true)
        setMobileScrolledPast(false)
      } else {
        setMobileScrolledPast(true)
        setSearchRowVisible(currentY < lastScrollY.current)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isStorePage])

  return (
    <div
      className={clx("fixed top-0 inset-x-0 z-50", isProductPage && "hidden small:block")}
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      data-search-row-visible={searchRowVisible}
    >
      <AnnouncementBanner />
      <header className={clx(
        "relative h-auto md:h-20 mx-auto duration-300 transition-all",
        isHovered || (isStorePage && mobileScrolledPast && searchRowVisible) ? "bg-white" : "bg-transparent"
      )}>
        <nav
          className={clx(
            "px-4 sm:px-8 txt-xsmall-plus flex items-center justify-between w-full h-full transition-colors duration-300",
            {
              "text-white": isHome && !isHovered,
              "text-gray-900": !isHome || isHovered,
            }
          )}
          data-search-hidden={isStorePage && !searchRowVisible ? "true" : undefined}
        >
          {children}
        </nav>
      </header>
    </div>
  )
}
