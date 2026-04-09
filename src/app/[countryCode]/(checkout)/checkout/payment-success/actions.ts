"use server"

import { removeCartId, getCacheTag } from "@lib/data/cookies"
import { revalidateTag } from "next/cache"

export async function clearCartAction() {
  await removeCartId()
  const orderCacheTag = await getCacheTag("orders")
  if (orderCacheTag) revalidateTag(orderCacheTag)
}
