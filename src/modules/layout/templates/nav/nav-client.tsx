"use client"

import { usePathname } from "next/navigation"
import { clx } from "@medusajs/ui"
import { useHeaderHover } from "@lib/context/header-hover-context"

export default function NavClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isHovered, setNavHovered } = useHeaderHover()
  
  // Check if current path is homepage (root or country root e.g., /us, /tr)
  // Regex matches "/" or "/xx" where xx is 2 letters
  const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname)

  return (
    <div 
      className="fixed top-0 inset-x-0 z-50"
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
    >
      <header className={clx(
        "relative h-20 mx-auto duration-300 transition-all",
        isHovered ? "bg-white" : "bg-transparent"
      )}>
        <nav
          className={clx(
            "px-4 sm:px-8 txt-xsmall-plus flex items-center justify-between w-full h-full transition-colors duration-300",
            {
              "text-white": isHome && !isHovered,
              "text-gray-900": !isHome || isHovered,
            }
          )}
        >
          {children}
        </nav>
      </header>
    </div>
  )
}
