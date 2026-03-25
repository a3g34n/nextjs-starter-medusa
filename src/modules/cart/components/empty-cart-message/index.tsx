import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = ({ dictionary }: { dictionary?: any }) => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {dictionary?.cart?.title ?? "Sepet"}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {dictionary?.cart?.empty_title ?? "Sepetinizde herhangi bir ürün bulunmuyor."} {dictionary?.cart?.empty_message ?? "Hadi bunu değiştirelim, ürünlerimize göz atmak için aşağıdaki bağlantıyı kullanın."}
      </Text>
      <div>
        <InteractiveLink href="/store">{dictionary?.cart?.empty_cta ?? "Ürünleri Keşfet"}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
