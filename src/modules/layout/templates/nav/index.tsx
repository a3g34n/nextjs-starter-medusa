import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchModal from "@modules/search/components/search-modal"
import NavClient from "./nav-client"

import { retrieveCustomer } from "@lib/data/customer"

// ... imports ...


export default async function Nav({ dictionary, countryCode }: { dictionary: any, countryCode: string }) {
  const [regions, locales, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    retrieveCustomer(),
  ])

  const t = dictionary
  const currentLocale = countryCode

  return (
    <NavClient>
      <div className="flex flex-col w-full">
        {/* Top Row: Logo, Hamburger, Icons */}
        <div className="flex items-center justify-between w-full h-20">
          {/* Left: Hamburger Menu + Logo */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
              dictionary={t}
            />
          </div>

          {/* Center: Search (Desktop Only) */}
          <div className="hidden md:flex items-center h-full">
            <div className="relative">
              <SearchModal dictionary={t} />
            </div>
          </div>

          {/* Right: Icons (Account, Wishlist, Help, Cart) */}
          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            <LocalizedClientLink
              className="hover:opacity-80 transition-opacity flex items-center gap-2"
              href="/account"
              data-testid="nav-account-link"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="hidden md:inline text-xs tracking-widest uppercase">
                {customer ? (customer.first_name ? customer.first_name : t.nav.account) : t.nav.login}
              </span>
            </LocalizedClientLink>

            {/* Help */}
            <LocalizedClientLink
              href="/yardim"
              className="hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <span className="hidden md:inline text-xs tracking-widest uppercase">{t.nav.help}</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:opacity-80 transition-opacity relative"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton dictionary={t} />
            </Suspense>
          </div>
        </div>

        {/* Bottom Row: Search (Mobile Only) */}
        <div className="md:hidden w-full pb-4 px-1">
          <SearchModal mobile dictionary={t} />
        </div>
      </div>
    </NavClient>
  )
}
