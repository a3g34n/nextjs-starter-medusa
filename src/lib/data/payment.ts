"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const getPaytrToken = async (cartId: string): Promise<string> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    const response = await sdk.client.fetch<{ token: string }>(
      `/store/paytr/token`,
      {
        method: "POST",
        body: { cart_id: cartId },
        headers,
      }
    )

    if (!response.token) {
      throw new Error("Backend returned no token")
    }

    return response.token
  } catch (err: any) {
    const message = err?.message ?? String(err)
    console.error("[getPaytrToken] failed:", message, "cartId:", cartId)
    throw new Error(`PayTR token fetch failed: ${message}`)
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
