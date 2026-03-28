import React, { Suspense } from "react"
import { Text } from "@medusajs/ui"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import MobileProductHeaderServer from "@modules/products/components/mobile-product-header/server"
import ProductFeatureBadges from "@modules/products/components/product-feature-badges"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* ── Mobile layout ── */}
      <div className="block small:hidden" data-testid="product-container">
        {/* Floating X + cart overlay */}
        <Suspense fallback={null}>
          <MobileProductHeaderServer />
        </Suspense>

        {/* Full-bleed image carousel – no top padding, nav is hidden on mobile */}
        <ImageGallery images={images} />

        {/* Product info + actions */}
        <div className="px-6 pt-4 pb-8 flex flex-col gap-y-3">
          <ProductInfo product={product} hideDescription />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions disabled={true} product={product} region={region} />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductFeatureBadges isCustomizable={product.metadata?.allows_customization === true} />
          {product.description && (
            <Text
              className="text-xs text-ui-fg-subtle whitespace-pre-line"
              data-testid="product-description"
            >
              {product.description}
            </Text>
          )}
          <ProductTabs product={product} />
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div
        className="hidden small:flex content-container flex-row items-start pb-6 pt-24 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col sticky top-48 py-8 max-w-[300px] w-full gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col sticky top-48 py-8 max-w-[300px] w-full gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions disabled={true} product={product} region={region} />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductFeatureBadges isCustomizable={product.metadata?.allows_customization === true} />
        </div>
      </div>

      <div
        className="content-container mt-2 mb-16 small:mt-4 small:mb-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
