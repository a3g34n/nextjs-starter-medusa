"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"

type MobileProductHeaderProps = {
  cartItemsCount?: number
}

export default function MobileProductHeader({
  cartItemsCount = 0,
}: MobileProductHeaderProps) {
  const router = useRouter()

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 pt-4 small:hidden pointer-events-none">
      {/* X button – go back */}
      <button
        onClick={() => router.back()}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow pointer-events-auto"
        aria-label="Geri"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Cart button */}
      <LocalizedClientLink
        href="/cart"
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow relative pointer-events-auto"
        aria-label="Sepet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center leading-none">
            {cartItemsCount}
          </span>
        )}
      </LocalizedClientLink>
    </div>
  )
}
