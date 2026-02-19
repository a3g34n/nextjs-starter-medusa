"use client"

import { useState, useRef, useEffect } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import { useHeaderHover } from "@lib/context/header-hover-context"

// Working sidebar items from original starter
const SideMenuItems = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Mağaza", href: "/store" },
  { name: "Hesabım", href: "/account" },
  { name: "Sepetim", href: "/cart" },
]

const bottomLinks = [
  { name: "+INFO", href: "/info" },
  { name: "YARDIM", href: "/help" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setNavHovered } = useHeaderHover()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Sync sidebar state with header hover state
  useEffect(() => {
    if (isOpen) {
      setNavHovered(true)
    } else {
      // When sidebar closes, we reset hover state. 
      // If the mouse is actually still on the navbar, NavClient's events should handle it,
      // but explicitly setting false here handles the "mouse left to void" case.
      setNavHovered(false)
    }
  }, [isOpen, setNavHovered])

  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const open = () => {
    cancelClose()
    setIsOpen(true)
  }

  const scheduleClose = () => {
    cancelClose()
    // Longer delay for stability - 500ms
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 500)
  }

  const close = () => {
    cancelClose()
    setIsOpen(false)
  }

  // Don't render interactive elements until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="h-full flex items-center">
        <div className="h-full flex items-center gap-x-6">
          <button className="relative h-full flex items-center focus:outline-none">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase">
            LOUNJSTUDIO
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center">
      {/* Trigger area - hamburger or close icon */}
      <div
        className="h-full flex items-center gap-x-6 cursor-pointer"
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <button
          data-testid="nav-menu-button"
          className="relative h-full flex items-center transition-all ease-out duration-300 focus:outline-none hover:opacity-80"
          onClick={isOpen ? close : open}
        >
          {/* Mobile: Show X if open, Hamburger if closed. Desktop: Show Hamburger if closed, nothing if open (logo shifts) */}
          <div className="md:hidden">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
          
          {/* Desktop: Only Hamburger when closed */}
          <div className="hidden md:block">
            {!isOpen && (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </button>
        
        {/* Logo */}
        <LocalizedClientLink
          href="/"
          className="text-2xl sm:text-3xl font-light tracking-[0.2em] hover:opacity-80 transition-all duration-300 uppercase relative z-50"
          data-testid="nav-store-link"
          onClick={close}
        >
          LOUNJSTUDIO
        </LocalizedClientLink>
      </div>

      {/* Desktop: Full navbar hover zone - keeps sidebar open when hovering anywhere on navbar */}
      {isOpen && (
        <div
          className="hidden md:block fixed left-0 top-0 z-45"
          style={{
            width: '100vw',
            height: '80px',
            backgroundColor: 'transparent',
            pointerEvents: 'none',
          }}
          onMouseEnter={cancelClose}
        >
          <div 
            style={{
              position: 'absolute', left: 0, top: 0, width: '400px', height: '100%', pointerEvents: 'auto',
            }}
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
          />
        </div>
      )}

      {/* Desktop: Backdrop to close on right side hover */}
      {isOpen && (
        <div
          className="hidden md:block fixed z-40"
          style={{ 
            left: '288px', top: '80px', right: 0, bottom: 0, backgroundColor: 'transparent' 
          }}
          onMouseEnter={close}
          data-testid="side-menu-backdrop"
        />
      )}

      {/* Side Panel */}
      <div
        data-darkreader-ignore="true"
        className={`fixed bg-white overflow-y-auto transition-transform duration-300 ease-out
          inset-0 z-[-1] pt-[160px] md:pt-0
          md:top-20 md:left-0 md:bottom-0 md:w-96 md:h-[calc(100vh-80px)] md:z-50
        `}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <div
          data-testid="nav-menu-popup"
          data-darkreader-ignore="true"
          className="flex flex-col h-full px-8 pb-8 md:py-8"
        >
          {/* Main Menu Items */}
          <div className="flex-1 space-y-6">
            {SideMenuItems.map((item) => (
              <LocalizedClientLink
                key={item.name}
                href={item.href}
                className="block text-2xl font-light tracking-wide"
                style={{ color: '#111111' }}
                onClick={close}
              >
                {item.name}
              </LocalizedClientLink>
            ))}
          </div>

          {/* Bottom Links */}
          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1.5rem' }} className="space-y-3">
            {bottomLinks.map((link) => (
              <LocalizedClientLink
                key={link.name}
                href={link.href}
                className="block text-xs tracking-wide uppercase"
                style={{ color: '#666666' }}
                onClick={close}
              >
                {link.name}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
