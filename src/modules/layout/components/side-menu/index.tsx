"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import { useHeaderHover } from "@lib/context/header-hover-context"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  dictionary: any
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
}

const SideMenu = ({ regions: _regions, locales: _locales, currentLocale, dictionary, categories, collections }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname)

  const isTr = currentLocale?.startsWith("tr")

  // Only top-level categories (no parent)
  const topCategories = categories.filter((c) => !c.parent_category)

  const bottomLinks = [
    { name: dictionary.nav.account, href: "/account" },
    { name: dictionary.nav.cart, href: "/cart" },
    { name: dictionary.nav.help, href: "/yardim" },
  ]

  const [mounted, setMounted] = useState(false)
  const { isHovered, setNavHovered } = useHeaderHover()
  const logoSrc = (!isHome || isOpen || isHovered) ? "/logo.png" : "/logo-white.png"
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setNavHovered(true)
    } else {
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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 500)
  }

  const close = () => {
    cancelClose()
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <div className="h-full flex items-center">
        <div className="h-full flex items-center gap-x-6">
          <button className="relative h-full flex items-center focus:outline-none">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Image src={logoSrc} alt="LOUNJ Studio" height={80} width={380} className="object-contain mt-2" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center">
      {/* Trigger area */}
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
          className="hover:opacity-80 transition-all duration-300 relative z-50"
          data-testid="nav-store-link"
          onClick={close}
        >
          <Image
            src={logoSrc}
            alt="LOUNJ Studio"
            height={80}
            width={380}
            className="object-contain mt-2 transition-all duration-300"
          />
        </LocalizedClientLink>
      </div>

      {/* Desktop: navbar hover zone */}
      {isOpen && (
        <div
          className="hidden md:block fixed left-0 top-0 z-45"
          style={{ width: '100vw', height: '80px', backgroundColor: 'transparent', pointerEvents: 'none' }}
          onMouseEnter={cancelClose}
        >
          <div
            style={{ position: 'absolute', left: 0, top: 0, width: '400px', height: '100%', pointerEvents: 'auto' }}
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
          />
        </div>
      )}

      {/* Desktop: backdrop to close on right side */}
      {isOpen && (
        <div
          className="hidden md:block fixed z-40"
          style={{ left: '288px', top: '80px', right: 0, bottom: 0, backgroundColor: 'transparent' }}
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
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <div
          data-testid="nav-menu-popup"
          data-darkreader-ignore="true"
          className="flex flex-col h-full px-8 pb-8 md:py-8"
        >
          {/* Main Menu */}
          <div className="flex-1 space-y-8">
            {/* MAĞAZA */}
            <div>
              <LocalizedClientLink
                href="/store"
                className="block text-2xl tracking-wide uppercase"
                style={{ color: '#111111' }}
                onClick={close}
              >
                {isTr ? "Mağaza" : "Store"}
              </LocalizedClientLink>
              {topCategories.length > 0 && (
                <div className="mt-3 space-y-2 pl-5">
                  {topCategories.map((cat) => (
                    <LocalizedClientLink
                      key={cat.id}
                      href={`/categories/${cat.handle}`}
                      className="block text-base tracking-wide uppercase"
                      style={{ color: '#555555' }}
                      onClick={close}
                    >
                      {cat.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              )}
            </div>

            {/* KOLEKSİYONLAR */}
            <div>
              <LocalizedClientLink
                href="/store"
                className="block text-2xl tracking-wide uppercase"
                style={{ color: '#111111' }}
                onClick={close}
              >
                {isTr ? "Koleksiyonlar" : "Collections"}
              </LocalizedClientLink>
              {collections.length > 0 && (
                <div className="mt-3 space-y-2 pl-5">
                  {collections.map((col) => (
                    <LocalizedClientLink
                      key={col.id}
                      href={`/collections/${col.handle}`}
                      className="block text-base tracking-wide uppercase"
                      style={{ color: '#555555' }}
                      onClick={close}
                    >
                      {col.title}
                    </LocalizedClientLink>
                  ))}
                </div>
              )}
            </div>

            {/* HAKKIMIZDA */}
            <div>
              <LocalizedClientLink
                href="/hakkimizda"
                className="block text-2xl tracking-wide uppercase"
                style={{ color: '#111111' }}
                onClick={close}
              >
                {isTr ? "Hakkımızda" : "About Us"}
              </LocalizedClientLink>
            </div>
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
