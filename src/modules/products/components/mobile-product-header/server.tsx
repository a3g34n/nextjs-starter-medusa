import { retrieveCart } from "@lib/data/cart"
import MobileProductHeader from "."

export default async function MobileProductHeaderServer() {
  const cart = await retrieveCart().catch(() => null)
  const count =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  return <MobileProductHeader cartItemsCount={count} />
}
