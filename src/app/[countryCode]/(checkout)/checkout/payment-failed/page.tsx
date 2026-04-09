import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@medusajs/ui"

export default async function PaymentFailedPage() {
  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10 items-center text-center">
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Ödeme Başarısız</span>
          </Heading>
          <p className="text-ui-fg-subtle">
            Ödemeniz işlenemedi. Lütfen tekrar deneyin veya farklı bir ödeme yöntemi kullanın.
          </p>
          <div className="flex gap-4">
            <LocalizedClientLink
              href="/checkout?step=payment"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Tekrar Dene
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cart"
              className="border border-black text-black px-6 py-3 rounded hover:bg-gray-50 transition-colors"
            >
              Sepete Dön
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
