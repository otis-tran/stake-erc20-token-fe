'use client'

import Footer from "../../components/Footer";
import Header from "../../components/Header";

// 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import * as React from 'react'
import { Connector, useConnect, WagmiProvider } from 'wagmi'

import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'


export function WalletOptions() {
    const { connectors, connect } = useConnect()

    return connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
        </button>
    ))
}


export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    )
}

function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
}


const projectId = '570f3c3b7eff87b45e46202dfb0e21c9'

const queryClient = new QueryClient()

export default function Layout({ children }: { children: React.ReactNode }) {
    const wagmiConfig = createConfig({
        chains: [mainnet, base],
        connectors: [
            injected(),
            walletConnect({ projectId }),
            metaMask(),
            safe(),
        ],
        transports: {
            [mainnet.id]: http(),
            [base.id]: http(),
        },
    })
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <div className="flex h-screen flex-col bg-black">
                    <div className="h-16">
                        <Header isConnected={false} walletAddress="0x1234567890123456789012345678901234567890" />
                    </div>

                    <div className="flex-grow overflow-y-auto  p-6">
                        {children}
                    </div>

                    <ConnectWallet />
                    <div className="h-16">
                        <Footer />
                    </div>
                </div>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
