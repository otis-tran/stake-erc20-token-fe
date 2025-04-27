'use client'

import { useConnect } from 'wagmi'
import { useEffect, useState } from 'react'

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return connectors.map((connector) => (
    <button
      key={connector.uid}
      onClick={() => connect({ connector })}
      className="m-2 p-2 border rounded"
    >
      {connector.name}
    </button>
  ))
}
