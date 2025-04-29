'use client'

import { useAccount, useSwitchChain } from 'wagmi'
import { saigon } from 'wagmi/chains'
import { useEffect, useState } from 'react'
import { WalletInfo } from '@/components/WalletInfo'
import StakeInfo from '@/components/StakeInfo'

export default function Page() {
    const [mounted, setMounted] = useState(false)
    const { isConnected } = useAccount()
    const { chain } = useAccount()
    const { switchChain } = useSwitchChain()

    const handleSwitchNetwork = async () => {
        try {
            await switchChain({ chainId: saigon.id })
            console.log('Network Switched to Saigon')
        } catch (error) {
            console.error('Failed to switch network:', error)
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])


    if (!mounted) {
        return null
    }

    if (!isConnected) {
        return (
            <div className="w-full h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome to StakeApp</h2>
                    <p className="text-gray-400 mb-6">Please connect your wallet to continue</p>
                </div>
            </div>
        )
    }

    if (chain?.id !== saigon.id) {
        return (
            <div className="w-full h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Wrong Network</h2>
                    <p className="text-gray-400 mb-6">Please switch to Saigon testnet network to continue</p>
                    <button
                        onClick={handleSwitchNetwork}
                    >
                        Switch to Saigon testnet Network
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full flex items-center justify-between px-80">
            {/* <WalletInfo /> */}
            <StakeInfo
                netStakedIO="5,086,794.34"
                netStakedUSD="4,153,911.56"
                grossStaked="8,254,767.27"
                totalGPUs="6,213"
            />
        </div>
    )
}
