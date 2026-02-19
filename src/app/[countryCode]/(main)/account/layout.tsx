import { retrieveCustomer } from "@lib/data/customer"
import { getDictionary } from "@lib/util/dictionary"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"


export default async function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const dictionary = getDictionary(countryCode)
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <AccountLayout customer={customer} dictionary={dictionary}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
