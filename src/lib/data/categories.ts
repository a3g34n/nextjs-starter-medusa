import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const COLLECTIONS_CATEGORY_ID = "pcat_01KMT8JQW087EQH2PV4FSH59EF"

export const listCategories = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("categories")),
    revalidate: 60,
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next,
      }
    )
    .then(({ product_categories }) =>
      product_categories.filter(
        (c) =>
          c.id !== COLLECTIONS_CATEGORY_ID &&
          c.parent_category_id !== COLLECTIONS_CATEGORY_ID
      )
    )
}

export const listCollectionCategories = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("categories")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields: "*products,+products.thumbnail",
          parent_category_id: COLLECTIONS_CATEGORY_ID,
          limit: 100,
          ...query,
        },
        next,
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
