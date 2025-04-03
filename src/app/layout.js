// src/app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoCollab - AI-Powered Distribution Engine',
  description: 'Autonomous influencer marketing to grow your revenue',
  openGraph: {
    title: 'AutoCollab - AI-Powered Distribution Engine',
    description: 'Autonomous influencer marketing to grow your revenue',
    type: 'website',
    url: 'https://www.autocollab.co/',
    siteName: 'AutoCollab',
  },
  twitter: {
    card: 'summary',
    title: 'AutoCollab - AI-Powered Distribution Engine',
    description: 'Autonomous influencer marketing to grow your revenue',
  },
  metadataBase: new URL('https://www.autocollab.co/'),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.autocollab.co/',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}