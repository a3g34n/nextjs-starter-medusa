import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CategoryTabs from "@modules/store/components/category-tabs"
import StoreSubHeader from "@modules/store/components/store-sub-header"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const categories = await listCategories().then((cats) =>
    cats.filter((c) => !c.parent_category)
  )

  return (
    <div
      className="flex flex-col py-6 pt-0 content-container relative"
      data-testid="category-container"
    >
      <div className="h-28 w-full"></div>

      <StoreSubHeader>
        {/* Desktop layout */}
        <div className="hidden small:flex flex-col relative mb-4 pt-4 px-4 rounded-b-lg">
          <div className="w-full flex justify-start mb-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
              <LocalizedClientLink href="/" className="hover:text-black">ANASAYFA</LocalizedClientLink>
              <span className="mx-2">/</span>
              <LocalizedClientLink href="/store" className="hover:text-black">MAĞAZA</LocalizedClientLink>
              <span className="mx-2">/</span>
              <span className="text-black border-b border-black">{category.name.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full relative">
            <div className="flex-1"></div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max max-w-[60%] overflow-x-auto no-scrollbar">
              <CategoryTabs categories={categories} />
            </div>
            <div className="flex-1 flex justify-end">
              <RefinementList sortBy={sort} />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="block small:hidden">
          <div className="w-full border-b border-gray-100 px-2">
            <CategoryTabs categories={categories} mobile />
          </div>
          <div className="flex justify-center py-2 border-b border-gray-100">
            <RefinementList sortBy={sort} />
          </div>
        </div>
      </StoreSubHeader>

      <div className="w-full">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
