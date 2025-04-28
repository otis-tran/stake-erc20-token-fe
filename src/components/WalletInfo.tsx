'use client'

import { useAccount, useBalance } from 'wagmi'
import { saigon } from 'wagmi/chains'
import { formatUnits } from 'viem'
import { useEffect, useState } from 'react'
export function WalletInfo() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { chain } = useAccount()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: saigon.id,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isConnected) {
    return null
  }

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">Wallet Information</h2>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Address</div>
        <div className="text-white font-mono break-all">
          {address}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Network</div>
        <div className="text-white">
          {chain?.name || 'Unknown'}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Balance</div>
        <div className="text-white">
          {isBalanceLoading ? (
            'Loading...'
          ) : balance ? (
            `${formatUnits(balance.value, balance.decimals)} ${balance.symbol}`
          ) : (
            '0.00'
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Chain ID</div>
        <div className="text-white font-mono">
          {chain?.id || 'Unknown'}
        </div>
      </div>
    </div>
  )
} 