import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SolanaProvider from '@/components/web3/SolanaProvider';

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://web3-blog-cms.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Web3 Blog CMS — Solana-Powered Content Management System',
    template: '%s | Web3 Blog CMS',
  },
  description:
    'A modern, SEO-optimized blog CMS built with Next.js and Web3. Publish blockchain content, mint it as NFTs, and connect a Solana wallet to manage your blog on-chain.',
  keywords: ['Web3', 'Blockchain', 'Blog', 'CMS', 'Cryptocurrency', 'Solana'],
  authors: [{ name: 'Web3 Blog Team' }],
  creator: 'Web3 Blog Team',
  publisher: 'Web3 Blog',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Web3 Blog CMS',
    description:
      'A modern, SEO-optimized blog CMS built with Next.js and Solana wallet integration.',
    siteName: 'Web3 Blog CMS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web3 Blog CMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Blog CMS',
    description:
      'A modern, SEO-optimized blog CMS built with Next.js and Solana wallet integration.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <SolanaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SolanaProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Web3 Blog CMS',
              description:
                'A modern, SEO-optimized blog CMS with Solana wallet integration for publishing and managing blockchain content.',
              applicationCategory: 'ContentManagementSystemApplication',
              url: siteUrl,
              operatingSystem: 'Any',
            }),
          }}
        />
      </body>
    </html>
  );
}
