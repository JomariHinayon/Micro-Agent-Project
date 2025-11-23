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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

