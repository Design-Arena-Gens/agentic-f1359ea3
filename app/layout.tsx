import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Swipe - Dating App',
  description: 'Find your perfect match',
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
