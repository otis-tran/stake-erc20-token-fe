'use client';

import Link from 'next/link';
import ConnectButton from './ConnectButton';

interface HeaderProps {
    isConnected?: boolean;
    walletAddress?: string;
}

const Header = ({ isConnected = false, walletAddress = '' }: HeaderProps) => {
    return (
        <header className="w-full h-16 flex items-center justify-between px-80 bg-black/50 text-white shadow-md sticky top-0 z-50 border-b border-white/10">
            <Link href="/home" className="text-xl font-bold">
                StakeApp
            </Link>

            {!isConnected ? (
                <ConnectButton onClick={() => console.log('Connect clicked')}>
                    Connect Wallet
                </ConnectButton>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold text-white">
                        {walletAddress.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm font-mono text-gray-300">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                </div>
            )}
        </header>
    );
};

export default Header;
