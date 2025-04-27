'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { useState, useEffect } from 'react'

interface ConnectWalletProps {
  className?: string;
}

export function ConnectWallet({ className = '' }: ConnectWalletProps) {
  const { address, isConnected } = useAccount()
  const { connect, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [isConnecting, setIsConnecting] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      await connect({ connector: metaMask() })
    } catch (err) {
      console.error('Failed to connect wallet:', err)
    } finally {
      setIsConnecting(false)
    }
  }

  // Return null on server-side to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  if (isConnected) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-white">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => disconnect()}
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg
                   hover:bg-red-600 transition-colors duration-200 
                   shadow-sm border border-red-600
                   disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={handleConnect} 
      disabled={isPending || isConnecting}
      className={`px-6 py-2 bg-white text-black font-medium rounded-lg
                 hover:bg-gray-200 transition-colors duration-200 
                 shadow-sm border border-gray-200
                 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
    >
      {isPending || isConnecting ? 'Connecting...' : 'Connect Wallet'}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </button>
  )
}
