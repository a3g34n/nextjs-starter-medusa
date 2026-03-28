"use server"

import { HttpTypes } from "@medusajs/types"
import {
  COLLECTIONS_CATEGORY_ID,
  listCollectionCategories,
} from "./categories"
import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export const listCollections = async (
  queryParams: Record<string, any> = {}
): Promise<{ collections: HttpTypes.StoreProductCategory[]; count: number }> => {
  const categories = await listCollectionCategories(queryParams)
  return { collections: categories, count: categories.length }
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreProductCategory> => {
  const next = {
    ...(await getCacheOptions("categories")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields: "*category_children, *products",
          handle,
          parent_category_id: COLLECTIONS_CATEGORY_ID,
        },
        next,
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
