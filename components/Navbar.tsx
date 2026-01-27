"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const tabs = [
        { name: 'All News', href: '/all-news' },
        { name: 'Enterprise', href: '/sector/enterprise' },
        { name: 'Crypto Native', href: '/sector/crypto_native' },
        { name: 'Regulation', href: '/sector/regulation' },
    ];

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <nav className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-7xl h-20 flex flex-col md:flex-row items-center justify-between gap-4 py-2 md:py-0">
                {/* Brand - Left Aligned */}
                <Link href="/" className="flex flex-col items-start leading-none shrink-0 hover:opacity-80 transition-opacity">
                    <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                        BLOCKCHAIN <span className="text-slate-400 dark:text-slate-600">MONITOR</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">
                        Digital Asset Market Intelligence & Insight
                    </p>
                </Link>

                {/* Navigation Tabs - Centered */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`
                px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-200
                ${isActive(tab.href)
                                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}
              `}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>

                {/* Right side placeholder */}
                <div className="hidden md:block shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Legitimate Insight
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
