'use client'

import { useAccount } from 'wagmi'
import { WalletOptions } from './WalletOptions'
import { Account } from './Account'

export function ConnectWallet() {
  const { isConnected } = useAccount()

  if (isConnected) return <Account />
  return <WalletOptions />
}
