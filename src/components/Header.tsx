'use client';

import Link from 'next/link';
import { ConnectWallet } from './ConnectWallet';

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

            <ConnectWallet />
        </header>
    );
};

export default Header;
