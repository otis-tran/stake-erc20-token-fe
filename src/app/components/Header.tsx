// components/Header.tsx
'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full h-16 flex items-center justify-between px-6 bg-black/50 text-white shadow-md sticky top-0 z-50 border-b-1 border-white/10">
            <Link href="/home" className="text-xl font-bold">StakeApp</Link>
            <div className="flex items-center  items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold text-white">
                    R
                </div>
                <span className="text-sm font-mono text-gray-300">
                    0x12...AbC9
                </span>
            </div>
        </header>
    );
}
