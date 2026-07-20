'use client'

import { useState } from 'react'

export default function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  const connectWallet = async () => {
    // Sementara, nanti kita implementasi dengan wagmi
    setIsConnected(true)
    setAddress('0x1234...5678')
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity text-sm"
    >
      {isConnected ? address : 'Connect Wallet'}
    </button>
  )
}