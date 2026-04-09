import { getPaytrOrderByCart } from "@lib/data/payment"
import { redirect } from "next/navigation"
import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ClearCartAndRevalidate from "./clear-cart"

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cart_id?: string }>
}) {
  const { countryCode } = await params
  const { cart_id } = await searchParams

  // Look up order by cart ID via backend custom endpoint
  if (cart_id) {
    const { order_id } = await getPaytrOrderByCart(cart_id)
    if (order_id) {
      redirect(`/${countryCode}/order/${order_id}/confirmed`)
    }
  }

  // Fallback: order lookup failed — show success message
  // ClearCartAndRevalidate handles cookie removal + cache revalidation via server action
  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <ClearCartAndRevalidate />
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10 items-center text-center">
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Teşekkürler!</span>
            <span>Ödemeniz başarıyla alındı.</span>
          </Heading>
          <p className="text-ui-fg-subtle">
            Siparişiniz işleme alınmıştır. Birkaç dakika içinde siparişinizi hesabınızdan takip edebilirsiniz.
          </p>
          <LocalizedClientLink
            href="/account/orders"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Siparişlerimi Görüntüle
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
