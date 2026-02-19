"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters((prev) => !prev)

  return (
    <div className="flex items-center gap-6 relative">
      <button 
         onClick={toggleFilters}
         className={`text-xs tracking-widest uppercase hover:text-gray-600 transition-colors ${showFilters ? "text-black font-semibold" : "text-gray-500"}`}
      >
        SIRALA
      </button>
      
      {showFilters && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-100 p-4 rounded-md z-50 min-w-[200px] animate-fadeIn">
            <div className="flex flex-col gap-2">
                 <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
            </div>
        </div>
      )}
    </div>
  )
}

export default RefinementList
