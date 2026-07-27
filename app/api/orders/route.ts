import { NextRequest, NextResponse } from "next/server"
import { createOrderId, formatTelegramOrder, validateOrder } from "@/lib/orders"
import { sendTelegramMessage } from "@/lib/telegram"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface ProcessedOrder {
  orderId: string
  total: number
  expiresAt: number
}

interface RateEntry {
  count: number
  resetAt: number
}

const globalOrders = globalThis as typeof globalThis & {
  wineGrillProcessedOrders?: Map<string, ProcessedOrder>
  wineGrillRateLimits?: Map<string, RateEntry>
}

const processedOrders =
  globalOrders.wineGrillProcessedOrders ?? new Map<string, ProcessedOrder>()
const rateLimits = globalOrders.wineGrillRateLimits ?? new Map<string, RateEntry>()
globalOrders.wineGrillProcessedOrders = processedOrders
globalOrders.wineGrillRateLimits = rateLimits

const responseHeaders = {
  "Cache-Control": "no-store, max-age=0",
}

function isRateLimited(request: NextRequest) {
  const now = Date.now()
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const current = rateLimits.get(ip)

  if (!current || current.resetAt < now) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }

  current.count += 1
  return current.count > 6
}

export async function POST(request: NextRequest) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { ok: false, error: "TOO_MANY_REQUESTS" },
      { status: 429, headers: responseHeaders }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON" },
      { status: 400, headers: responseHeaders }
    )
  }

  const validation = validateOrder(payload)
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400, headers: responseHeaders }
    )
  }

  const now = Date.now()
  for (const [key, value] of processedOrders) {
    if (value.expiresAt < now) processedOrders.delete(key)
  }

  const duplicate = processedOrders.get(validation.order.idempotencyKey)
  if (duplicate) {
    return NextResponse.json(
      { ok: true, orderId: duplicate.orderId, total: duplicate.total, duplicate: true },
      { headers: responseHeaders }
    )
  }

  const orderId = createOrderId()
  const message = formatTelegramOrder(orderId, validation.order)
  const delivery = await sendTelegramMessage(message)

  if (!delivery.ok) {
    return NextResponse.json(
      { ok: false, error: delivery.error },
      { status: delivery.error === "TELEGRAM_NOT_CONFIGURED" ? 503 : 502, headers: responseHeaders }
    )
  }

  processedOrders.set(validation.order.idempotencyKey, {
    orderId,
    total: validation.order.total,
    expiresAt: now + 30 * 60_000,
  })

  return NextResponse.json(
    { ok: true, orderId, total: validation.order.total },
    { headers: responseHeaders }
  )
}
