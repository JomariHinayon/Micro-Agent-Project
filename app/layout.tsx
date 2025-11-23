import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Micro-Agent API',
  description: 'Business Strategy Summary Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">{children}</body>
    </html>
  )
}

