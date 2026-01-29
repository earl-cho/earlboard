import React from 'react';
import { getRecentReports } from '@/lib/api';
import NewsCard from '@/components/NewsCard';
import { LayoutGrid } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AllNewsPage() {
    const reports = await getRecentReports(100);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <header className="mb-16 border-l-8 border-slate-900 dark:border-white pl-8 py-4">
                    <div className="flex items-center gap-4 text-blue-600 mb-2">
                        <LayoutGrid size={24} />
                        <span className="font-black tracking-[0.2em] uppercase text-sm">ARCHIVE</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
                        All <span className="text-blue-600">News</span>
                    </h1>
                    <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Showing the latest 100 intelligence reports
                    </p>
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
