"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const getPaytrToken = async (
  cartId: string,
  okUrl: string,
  failUrl: string
): Promise<{ token: string | null; error: string | null }> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    const response = await sdk.client.fetch<{ iframe_token: string }>(
      `/store/paytr/token`,
      {
        method: "POST",
        body: { cart_id: cartId, ok_url: okUrl, fail_url: failUrl },
        headers,
      }
    )

    if (!response.iframe_token) {
      console.error("[getPaytrToken] backend returned no token, cartId:", cartId)
      return { token: null, error: "Backend returned no token" }
    }

    return { token: response.iframe_token, error: null }
  } catch (err: any) {
    const message = err?.message ?? String(err)
    console.error("[getPaytrToken] failed:", message, "cartId:", cartId)
    return { token: null, error: message }
  }
}

export const getPaytrOrderByCart = async (
  cartId: string
): Promise<{ order_id: string | null; error: string | null }> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    const response = await sdk.client.fetch<{ order_id: string }>(
      `/store/paytr/order-by-cart`,
      {
        method: "GET",
        query: { cart_id: cartId },
        headers,
      }
    )

    if (!response.order_id) {
      return { order_id: null, error: "No order found for cart" }
    }

    return { order_id: response.order_id, error: null }
  } catch (err: any) {
    const message = err?.message ?? String(err)
    console.error("[getPaytrOrderByCart] failed:", message, "cartId:", cartId)
    return { order_id: null, error: message }
  }
}

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("payment_providers")),
  }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    )
    .catch(() => {
      return null
    })
}
