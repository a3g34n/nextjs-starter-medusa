import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavClient from "./nav-client"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <NavClient>
      {/* Left: Hamburger Menu + Logo (both trigger sidebar on hover) */}
      <div className="flex-1 basis-0 h-full flex items-center">
        <SideMenu
          regions={regions}
          locales={locales}
          currentLocale={currentLocale}
        />
      </div>

      {/* Center: Search */}
      <div className="flex items-center h-full">
        <div className="relative">
          <span className="text-base tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
            ARA
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-current opacity-50 transition-colors duration-300 group-hover:bg-gray-400"></div>
        </div>
      </div>

      {/* Right: Account, Help, Cart */}
      <div className="flex items-center gap-x-8 h-full flex-1 basis-0 justify-end">
        <div className="hidden small:flex items-center gap-x-8 h-full text-sm tracking-wide">
          <LocalizedClientLink
            className="hover:opacity-80 transition-opacity flex items-center gap-2"
            href="/account"
            data-testid="nav-account-link"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            OTURUMU BAŞLAT
          </LocalizedClientLink>
          <span className="hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            YARDIM
          </span>
        </div>
        <Suspense
          fallback={
            <LocalizedClientLink
              className="hover:opacity-80 transition-opacity flex items-center gap-2 text-sm tracking-wide"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              SEPET (0)
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      </div>
    </NavClient>
  )
}
