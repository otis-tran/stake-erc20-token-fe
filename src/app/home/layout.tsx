import { WagmiProviders } from '@/components/WagmiProviders'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <WagmiProviders>
          <div className="flex h-screen flex-col bg-black text-white">
            <Header />
            <main className="flex-grow overflow-y-auto p-6">{children}</main>
            <Footer />
          </div>
        </WagmiProviders>
  )
}
