// lib/wagmi-config.ts
import { http, createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { injected, walletConnect, metaMask, safe } from 'wagmi/connectors'

const projectId = '570f3c3b7eff87b45e46202dfb0e21c9'

export const wagmiConfig = createConfig({
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
