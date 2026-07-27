interface TelegramResponse {
  ok: boolean
  description?: string
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return { ok: false as const, error: "TELEGRAM_NOT_CONFIGURED" }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 9000)

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: process.env.TELEGRAM_TEST_PREFIX
          ? `${process.env.TELEGRAM_TEST_PREFIX}\n${text}`
          : text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
      cache: "no-store",
    })

    const data = (await response.json()) as TelegramResponse
    if (!response.ok || !data.ok) {
      console.error("Telegram delivery failed", {
        status: response.status,
        description: data.description,
      })
      return { ok: false as const, error: "TELEGRAM_REJECTED" }
    }

    return { ok: true as const }
  } catch (error) {
    console.error("Telegram delivery error", {
      name: error instanceof Error ? error.name : "UnknownError",
    })
    return { ok: false as const, error: "TELEGRAM_UNAVAILABLE" }
  } finally {
    clearTimeout(timeout)
  }
}
