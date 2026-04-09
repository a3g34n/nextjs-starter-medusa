import { retrieveOrder } from "@lib/data/orders"
import { getDictionary } from "@lib/util/dictionary"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string; countryCode: string }>
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  const dictionary = getDictionary(params.countryCode)

  return <OrderCompletedTemplate order={order} dictionary={dictionary} />
}
