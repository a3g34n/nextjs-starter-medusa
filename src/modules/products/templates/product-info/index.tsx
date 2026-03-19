import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  hideDescription?: boolean
}

const ProductInfo = ({ product, hideDescription }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-1 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-lg leading-6 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {!hideDescription && (
          <Text
            className="text-medium text-ui-fg-subtle whitespace-pre-line"
            data-testid="product-description"
          >
            {product.description}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
