export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
  },
  {
    id: "telegram",
    label: "Telegram",
    url: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL ?? "",
  },
].filter((link) => link.url.startsWith("https://"))

export const reviewUrl = process.env.NEXT_PUBLIC_REVIEW_URL ?? ""
