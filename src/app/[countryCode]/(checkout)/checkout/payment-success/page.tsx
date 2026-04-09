import PaymentSuccessPoller from "./poller"

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cart_id?: string }>
}) {
  const { countryCode } = await params
  const { cart_id } = await searchParams

  return <PaymentSuccessPoller cartId={cart_id ?? null} countryCode={countryCode} />
}
