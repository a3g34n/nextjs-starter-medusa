import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cart_id")

  if (!cartId) {
    return NextResponse.json({ error: "Missing cart_id" }, { status: 400 })
  }

  const backendUrl = process.env.MEDUSA_BACKEND_URL ?? "http://localhost:9000"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

  const res = await fetch(
    `${backendUrl}/store/paytr/order-by-cart?cart_id=${cartId}`,
    {
      headers: {
        "x-publishable-api-key": publishableKey,
      },
    }
  )

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
