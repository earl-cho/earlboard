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
        <nav className="sticky top-6 z-[100] w-[calc(100%-2rem)] mx-auto glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
                {/* Brand - Left Aligned */}
                <Link href="/" className="flex flex-col items-start leading-none shrink-0 hover:opacity-80 transition-opacity">
                    <h1 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic flex items-center gap-2">
                        <span className="bg-white dark:bg-white text-black px-2 rounded-sm">BLOCKCHAIN</span>
                        <span className="text-slate-500">MONITOR</span>
                    </h1>
                    <p className="premium-caps text-slate-400 mt-2">
                        Digital Asset Intelligence
                    </p>
                </Link>

                {/* Navigation Tabs - Hidden on small screens for cleaner look, ideally would have a mobile menu */}
                <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`
                px-6 py-3 text-[12px] font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300
                ${isActive(tab.href)
                                    ? 'bg-white dark:bg-white text-black shadow-xl scale-105'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>

                {/* Right side - Dynamic Indicator */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">LIVE INTELLIGENCE</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
