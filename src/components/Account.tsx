'use client'

import { useEffect, useState } from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null


  return (
    <div className="flex flex-col items-center space-y-2">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} className="w-16 h-16 rounded-full" />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()} className="mt-2 p-2 bg-red-500 rounded text-white">
        Disconnect
      </button>
    </div>
  )
}
