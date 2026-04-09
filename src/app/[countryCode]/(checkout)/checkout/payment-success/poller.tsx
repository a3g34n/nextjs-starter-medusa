"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { clearCartAction } from "./actions"

const MAX_ATTEMPTS = 15
const POLL_INTERVAL = 2000

export default function PaymentSuccessPoller({
  cartId,
  countryCode,
}: {
  cartId: string | null
  countryCode: string
}) {
  const router = useRouter()
  const [attempts, setAttempts] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!cartId) {
      setFailed(true)
      return
    }

    clearCartAction()

    let attempt = 0

    const poll = async () => {
      attempt++
      setAttempts(attempt)

      try {
        const res = await fetch(`/api/paytr/order-by-cart?cart_id=${cartId}`)

        if (res.ok) {
          const data = await res.json()
          if (data.order_id) {
            router.replace(`/${countryCode}/order/${data.order_id}/confirmed`)
            return
          }
        }
      } catch {}

      if (attempt >= MAX_ATTEMPTS) {
        setFailed(true)
        return
      }

      setTimeout(poll, POLL_INTERVAL)
    }

    poll()
  }, [cartId, countryCode, router])

  if (failed) {
    return (
      <div className="py-6 min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="max-w-md text-center px-4">
          <h1 className="text-2xl font-semibold mb-4">Ödemeniz alındı</h1>
          <p className="text-ui-fg-subtle">
            Ödemeniz alındı ancak siparişiniz beklenenden uzun süre oluşturuluyor. Lütfen destek ekibimizle iletişime geçin.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-md text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Ödemeniz işleniyor...</h1>
        <p className="text-ui-fg-subtle text-sm">
          Lütfen bekleyin, siparişiniz oluşturuluyor. ({attempts}/{MAX_ATTEMPTS})
        </p>
      </div>
    </div>
  )
}
