"use client"

import { useState, useRef, useEffect } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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
      {/* Trigger area - hamburger icon and logo */}
      <div
        className="h-full flex items-center gap-x-6"
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        {/* Three-line hamburger icon - hidden when sidebar is open */}
        {!isOpen && (
          <button
            data-testid="nav-menu-button"
            className="relative h-full flex items-center transition-all ease-out duration-300 focus:outline-none hover:opacity-80"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        {/* Logo */}
        <LocalizedClientLink
          href="/"
          className="text-2xl sm:text-3xl font-light tracking-[0.2em] hover:opacity-80 transition-all duration-300 uppercase"
          data-testid="nav-store-link"
        >
          LOUNJSTUDIO
        </LocalizedClientLink>
      </div>

      {/* Full navbar hover zone - keeps sidebar open when hovering anywhere on navbar */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-45"
          style={{
            width: '100vw',
            height: '80px',
            backgroundColor: 'transparent',
            pointerEvents: 'none', // Don't block clicks on navbar items
          }}
          onMouseEnter={cancelClose}
        >
          {/* Active hover zone on the left side only */}
          <div 
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '400px', // Wide enough to cover logo + some buffer
              height: '100%',
              pointerEvents: 'auto',
            }}
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
          />
        </div>
      )}

      {/* Backdrop - closes sidebar when clicking/hovering on right side of page */}
      {isOpen && (
        <div
          className="fixed z-40"
          style={{ 
            left: '288px',
            top: '80px', // Below navbar
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent' 
          }}
          onMouseEnter={close}
          data-testid="side-menu-backdrop"
        />
      )}

      {/* Side Panel - Light/White design */}
      <div
        data-darkreader-ignore="true"
        className="fixed left-0 top-20 w-72 z-50 overflow-y-auto transition-transform duration-300 ease-out"
        style={{
          height: 'calc(100vh - 80px)',
          backgroundColor: '#ffffff',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <div
          data-testid="nav-menu-popup"
          data-darkreader-ignore="true"
          className="flex flex-col h-full py-8 px-8"
          style={{ backgroundColor: '#ffffff' }}
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
