import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import { getDictionary } from "@lib/util/dictionary"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const dictionary = getDictionary(countryCode)
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{dictionary?.account?.orders ?? "Orders"}</h1>
        <p className="text-base-regular">
          {dictionary?.account?.orders_description ?? "View your previous orders and their status. You can also create returns or exchanges for your orders if needed."}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} dictionary={dictionary} />
        <Divider className="my-16" />
        <TransferRequestForm dictionary={dictionary} />
      </div>
    </div>
  )
}
