"use client"

import { useHeaderHover } from "@lib/context/header-hover-context"
import { clx } from "@medusajs/ui"

type StoreSubHeaderProps = {
  children: React.ReactNode
}

export default function StoreSubHeader({ children }: StoreSubHeaderProps) {
  const { isHovered, setSubHeaderHovered } = useHeaderHover()

  return (
    <div 
      className={clx(
        "sticky top-20 z-40 flex flex-col mb-8 transition-colors duration-300",
        isHovered ? "bg-white" : "bg-transparent"
      )}
      id="store-sub-header"
      onMouseEnter={() => setSubHeaderHovered(true)}
      onMouseLeave={() => setSubHeaderHovered(false)}
    >
      {children}
    </div>
  )
}
