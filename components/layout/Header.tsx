import Link from 'next/link'
import ConnectWallet from '@/components/web3/ConnectWallet'

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Web3 Blog
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
            Admin
          </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  )
}