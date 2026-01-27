import React from 'react';
import { getReportsBySector } from '@/lib/api';
import NewsCard from '@/components/NewsCard';
import { ArrowLeft, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const sectorMetadata: any = {
    enterprise: { title: 'Enterprise Adoption', icon: <BarChart3 size={24} />, code: 'ENTERPRISE' },
    crypto_native: { title: 'Crypto Native', icon: <Zap size={24} />, code: 'CRYPTO_NATIVE' },
    regulation: { title: 'Regulation & Policy', icon: <ShieldCheck size={24} />, code: 'REGULATION' },
};

export default async function SectorPage({ params }: { params: { sector: string } }) {
    const { sector } = await params;
    const meta = sectorMetadata[sector.toLowerCase()];

    if (!meta) return <div>Sector not found</div>;

    const reports = await getReportsBySector(meta.code, 20);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 uppercase tracking-widest">
                    <ArrowLeft size={16} /> BACK TO DASHBOARD
                </Link>

                <header className="mb-16 border-l-8 border-slate-900 dark:border-white pl-8 py-4">
                    <div className="flex items-center gap-4 text-blue-600 mb-2">
                        {meta.icon}
                        <span className="font-black tracking-[0.2em] uppercase text-sm">CATEGORY</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
                        {meta.title}
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => (
                        <NewsCard key={report.id} report={report} />
                    ))}
                </div>
            </div>
        </main>
    );
}
