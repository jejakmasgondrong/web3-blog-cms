import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Web3 Blog CMS',
    template: '%s | Web3 Blog CMS'
  },
  description: 'A modern, SEO-optimized blog CMS with Web3 integration',
  keywords: ['Web3', 'Blockchain', 'Blog', 'CMS', 'Cryptocurrency'],
  authors: [{ name: 'Web3 Blog Team' }],
  creator: 'Web3 Blog Team',
  publisher: 'Web3 Blog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Web3 Blog CMS',
    description: 'A modern, SEO-optimized blog CMS with Web3 integration',
    siteName: 'Web3 Blog CMS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web3 Blog CMS'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Blog CMS',
    description: 'A modern, SEO-optimized blog CMS with Web3 integration',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}