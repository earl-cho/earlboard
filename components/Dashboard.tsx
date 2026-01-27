import React from 'react';
import { getReportsBySector, getRecentReports } from '@/lib/api';
import NewsCard from './NewsCard';
import { ChevronRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const Dashboard = async () => {
    const [enterpriseNews, nativeNews, regulationNews] = await Promise.all([
        getReportsBySector('ENTERPRISE', 4),
        getReportsBySector('CRYPTO_NATIVE', 4),
        getReportsBySector('REGULATION', 4),
    ]);

    const renderSection = (title: string, icon: React.ReactNode, reports: any[], sectorCode: string) => {
        if (reports.length === 0) return null;

        return (
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg">
                            {icon}
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href={`/sector/${sectorCode.toLowerCase()}`}
                        className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        VIEW ALL <ChevronRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reports.map((report) => (
                        <NewsCard key={report.id} report={report} />
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Hero / Header */}
            <header className="mb-20 text-center">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white italic uppercase">
                    Earl<span className="text-blue-600">board</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase text-xs md:text-sm">
                    Digital Asset Market Intelligence & Institutional Insight
                </p>
            </header>

            {/* Sections */}
            {renderSection('Enterprise Adoption', <BarChart3 size={20} />, enterpriseNews, 'ENTERPRISE')}
            {renderSection('Crypto Native', <Zap size={20} />, nativeNews, 'CRYPTO_NATIVE')}
            {renderSection('Regulation & Policy', <ShieldCheck size={20} />, regulationNews, 'REGULATION')}
        </div>
    );
};

export default Dashboard;
