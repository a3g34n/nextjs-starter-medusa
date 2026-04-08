"use client"

import { isManual, isStripeLike, isPaytr } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { getPaytrToken } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import ErrorMessage from "../error-message"
import PaytrIframe from "../paytr-iframe"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
  dictionary?: any
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  dictionary,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          dictionary={dictionary}
        />
      )
    case isPaytr(paymentSession?.provider_id):
      return <PaytrPaymentButton cart={cart} notReady={notReady} data-testid={dataTestId} dictionary={dictionary} />
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} dictionary={dictionary} />
      )
    default:
      return <Button disabled>{dictionary?.checkout?.select_payment_method ?? "Select a payment method"}</Button>
  }
}

const PaytrPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  dictionary,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
  dictionary?: any
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (notReady || !cart.id) return

    setLoading(true)
    setFetchError(null)

    getPaytrToken(cart.id)
      .then((t) => setToken(t))
      .catch((err: any) => setFetchError(err?.message ?? "PayTR token could not be fetched. Please refresh or try again."))
      .finally(() => setLoading(false))
  }, [cart.id, notReady])

  if (notReady) {
    return (
      <Button disabled size="large" data-testid={dataTestId}>
        {dictionary?.checkout?.place_order ?? "Place order"}
      </Button>
    )
  }

  if (loading) {
    return (
      <Button disabled size="large" data-testid={dataTestId}>
        {dictionary?.checkout?.loading ?? "Loading payment..."}
      </Button>
    )
  }

  if (fetchError || !token) {
    return (
      <ErrorMessage error={fetchError ?? "PayTR token is missing. Please refresh or try again."} />
    )
  }

  return (
    <div className="w-full mt-4">
      <PaytrIframe token={token} />
    </div>
  )
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  dictionary,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
  dictionary?: any
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        {dictionary?.checkout?.place_order ?? "Place order"}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady, dictionary }: { notReady: boolean, dictionary?: any }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        {dictionary?.checkout?.place_order ?? "Place order"}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
