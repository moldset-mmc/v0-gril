import { menuItems, type Locale, type MenuItem, type MenuOption } from "./translations"

export interface OrderLine {
  item: MenuItem
  option?: MenuOption
  quantity: number
  subtotal: number
}

export interface ValidatedOrder {
  idempotencyKey: string
  locale: Locale
  table: number
  comment: string
  lines: OrderLine[]
  total: number
  source?: {
    category?: string | null
    dish?: string | null
    qrCode?: string | null
  }
}

type ValidationResult =
  | { ok: true; order: ValidatedOrder }
  | { ok: false; error: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function validateOrder(payload: unknown): ValidationResult {
  if (!isRecord(payload)) return { ok: false, error: "INVALID_PAYLOAD" }

  const locale: Locale = payload.locale === "ro" ? "ro" : "ru"
  const table = Number(payload.table)
  const idempotencyKey =
    typeof payload.idempotencyKey === "string" ? payload.idempotencyKey.trim() : ""
  const comment = typeof payload.comment === "string" ? payload.comment.trim() : ""

  if (!Number.isInteger(table) || table < 1 || table > 99) {
    return { ok: false, error: "INVALID_TABLE" }
  }
  if (idempotencyKey.length < 8 || idempotencyKey.length > 100) {
    return { ok: false, error: "INVALID_KEY" }
  }
  if (comment.length > 500) return { ok: false, error: "COMMENT_TOO_LONG" }
  if (!Array.isArray(payload.items) || payload.items.length < 1 || payload.items.length > 30) {
    return { ok: false, error: "INVALID_ITEMS" }
  }

  const lines: OrderLine[] = []

  for (const rawLine of payload.items) {
    if (!isRecord(rawLine)) return { ok: false, error: "INVALID_ITEM" }

    const id = Number(rawLine.id)
    const quantity = Number(rawLine.quantity)
    const item = menuItems.find((candidate) => candidate.id === id)

    if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return { ok: false, error: "INVALID_ITEM" }
    }

    const optionValue =
      typeof rawLine.optionValue === "string" ? rawLine.optionValue : undefined
    const option = optionValue
      ? item.options?.find((candidate) => candidate.value === optionValue)
      : undefined

    if (item.options?.length && !option) {
      return { ok: false, error: "OPTION_REQUIRED" }
    }

    lines.push({
      item,
      option,
      quantity,
      subtotal: item.price * quantity,
    })
  }

  const source = isRecord(payload.source)
    ? {
        category: typeof payload.source.category === "string" ? payload.source.category : null,
        dish: typeof payload.source.dish === "string" ? payload.source.dish : null,
        qrCode: typeof payload.source.qrCode === "string" ? payload.source.qrCode : null,
      }
    : undefined

  return {
    ok: true,
    order: {
      idempotencyKey,
      locale,
      table,
      comment,
      lines,
      total: lines.reduce((sum, line) => sum + line.subtotal, 0),
      source,
    },
  }
}

export function createOrderId() {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Chisinau",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()).replaceAll("-", "")
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 4).toUpperCase()
  return `WG-${date}-${suffix}`
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function formatTelegramOrder(orderId: string, order: ValidatedOrder) {
  const time = new Intl.DateTimeFormat(order.locale === "ro" ? "ro-MD" : "ru-MD", {
    timeZone: "Europe/Chisinau",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date())

  const lines = order.lines.map(({ item, option, quantity, subtotal }) => {
    const optionText = option ? ` (${escapeHtml(option.label[order.locale])})` : ""
    return `${quantity} × <b>${escapeHtml(item.name[order.locale])}</b>${optionText} — ${subtotal} MDL`
  })

  const source = [
    order.source?.qrCode ? `QR ${escapeHtml(order.source.qrCode)}` : "",
    order.source?.category ? `категория ${escapeHtml(order.source.category)}` : "",
    order.source?.dish ? `блюдо ${escapeHtml(order.source.dish)}` : "",
  ].filter(Boolean).join(" · ")

  return [
    `🆕 <b>Новый заказ #${escapeHtml(orderId)}</b>`,
    "",
    `🪑 Стол: <b>${order.table}</b>`,
    `🕒 Время: ${escapeHtml(time)}`,
    `🌐 Язык: ${order.locale.toUpperCase()}`,
    source ? `📱 Источник: ${source}` : "",
    "",
    ...lines,
    "",
    `💰 <b>ИТОГО: ${order.total} MDL</b>`,
    order.comment ? `💬 Комментарий: ${escapeHtml(order.comment)}` : "",
    `🔑 ${escapeHtml(order.idempotencyKey.slice(0, 8))}`,
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n")
}
