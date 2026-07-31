import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/components/locale-provider'
import { CartProvider } from '@/lib/cart-context'
import { CartSheet } from '@/components/cart-sheet'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wine & Grill — QR-меню и быстрый заказ',
  description: 'Основные блюда, супы, домашняя кухня, вино и настоящий гриль. Откройте QR-меню, соберите заказ на месте или навынос и отправьте его сотрудникам.',
  metadataBase: new URL('https://kitchenap.md'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wine & Grill — QR-меню и быстрый заказ',
    description: 'Откройте меню, соберите заказ на месте или навынос и отправьте его сотрудникам.',
    url: '/',
    siteName: 'Wine & Grill',
    locale: 'ru_MD',
    alternateLocale: ['ro_MD'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Wine & Grill — QR-меню и быстрый заказ',
    description: 'Откройте меню, соберите заказ на месте или навынос и отправьте его сотрудникам.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="font-sans antialiased">
        <CartProvider>
          <LocaleProvider>
            {children}
            <CartSheet />
          </LocaleProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
