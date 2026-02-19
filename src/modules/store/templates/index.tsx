import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CategoryTabs from "@modules/store/components/category-tabs"
import StoreSubHeader from "@modules/store/components/store-sub-header"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  searchValue,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  searchValue?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  
  // Fetch categories for tabs
  const categories = await listCategories().then(cats => 
    cats.filter(c => !c.parent_category)
  )

  return (
    <div className="flex flex-col py-6 pt-0 content-container relative" data-testid="category-container"> {/* Removed pt-28, handled by sticky placement or spacer if needed */}
      {/* Spacer for fixed navbar initial height to prevent overlap if we remove padding */}
      <div className="h-28 w-full"></div>

      {/* Sticky Top Header: Breadcrumbs (Left) - Tabs & Filters (Row) */}
      <StoreSubHeader>
        <div className="flex flex-col relative mb-4 pt-4 px-4 rounded-b-lg">
          {/* Row 1: Breadcrumbs */}
          <div className="w-full flex justify-start mb-2">
             <div className="text-xs text-gray-500 uppercase tracking-widest">
                <LocalizedClientLink href="/" className="hover:text-black">ANASAYFA</LocalizedClientLink>
                <span className="mx-2">/</span>
                <span className="text-black border-b border-black">MAĞAZA</span>
             </div>
          </div>

          {/* Row 2: Tabs (Center) & Filters (Right) */}
          <div className="flex items-center justify-between w-full relative">
            {/* Spacer/Left side empty to balance Filters */}
            <div className="flex-1"></div>

            {/* Centered Tabs */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max max-w-[60%] overflow-x-auto no-scrollbar">
                <CategoryTabs categories={categories} />
            </div>

            {/* Right: Filters */}
            <div className="flex-1 flex justify-end">
                <RefinementList sortBy={sort} />
            </div>
          </div>
        </div>
      </StoreSubHeader>

      <div className="w-full">
        {/* Removed redundant title since it's in breadcrumbs/tabs context */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            searchValue={searchValue}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
