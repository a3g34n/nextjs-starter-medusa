import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = ({ dictionary }: { dictionary?: any }) => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {dictionary?.cart?.title ?? "Cart"}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {dictionary?.cart?.empty_title ?? "You don't have anything in your cart."} {dictionary?.cart?.empty_message ?? "Hadi bunu değiştirelim, aşağıdaki linki kullanarak ürünlerimizi keşfedin."}
      </Text>
      <div>
        <InteractiveLink href="/store">{dictionary?.cart?.empty_cta ?? "Explore products"}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
