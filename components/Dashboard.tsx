import React from 'react';
import { getReportsBySector, getRecentReports } from '@/lib/api';
import NewsCard from './NewsCard';
import { ChevronRight, BarChart3, ShieldCheck, Zap, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Dashboard = async () => {
    // Fetch data
    const [recentNews, enterpriseNews, nativeNews, regulationNews] = await Promise.all([
        getRecentReports(4),
        getReportsBySector('ENTERPRISE', 4),
        getReportsBySector('CRYPTO_NATIVE', 4),
        getReportsBySector('REGULATION', 4),
    ]);

    const featuredArticle = recentNews[0];
    const sideArticles = recentNews.slice(1, 4);

    const renderSection = (title: string, icon: React.ReactNode, reports: any[], sectorCode: string) => {
        if (reports.length === 0) return null;

        return (
            <section className="mb-20">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg">
                            {icon}
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white uppercase italic">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href={`/sector/${sectorCode.toLowerCase()}`}
                        className="group flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors tracking-widest uppercase"
                    >
                        VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reports.map((report) => (
                        <NewsCard key={report.id} report={report} />
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Featured Section: New Articles */}
            {featuredArticle && (
                <section className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 flex items-center justify-center bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-full">
                            <Sparkles size={20} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-950 dark:text-white uppercase italic">
                            New <span className="text-slate-400">Articles</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Featured (Vertical XL) */}
                        <div className="lg:col-span-2 group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <Link href={`/report/${featuredArticle.id}`} className="flex flex-col h-full">
                                <div className="relative overflow-hidden aspect-[21/9]">
                                    <img
                                        src={featuredArticle.image_url || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&h=800&q=80'}
                                        alt={featuredArticle.title}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="px-3 py-1 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg">
                                            Featured
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <Clock size={12} /> Just Published
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black leading-[1.1] mb-6 text-slate-950 dark:text-white uppercase italic group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors tracking-tighter">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                        {featuredArticle.summary_3lines}
                                    </p>
                                    <div className="mt-auto inline-flex items-center gap-2 text-slate-950 dark:text-white font-black text-sm uppercase tracking-[0.2em] border-b-2 border-slate-950 dark:border-white pb-1 w-fit group-hover:opacity-70 transition-all">
                                        Full Intelligence <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Side Recent list */}
                        <div className="space-y-6 flex flex-col justify-between h-full">
                            {sideArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/report/${article.id}`}
                                    className="group/side block p-6 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm flex-1"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        {article.tags.slice(0, 1).map(tag => (
                                            <span key={tag} className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-900 dark:border-white">{tag}</span>
                                        ))}
                                    </div>
                                    <h4 className="text-lg font-black leading-tight text-slate-950 dark:text-white uppercase italic group-hover/side:opacity-70 transition-opacity">
                                        {article.title}
                                    </h4>
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                        {article.summary_3lines}
                                    </p>
                                    <div className="mt-4 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-4">
                                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categorized Sections */}
            {renderSection('Enterprise Adoption', <BarChart3 size={20} />, enterpriseNews, 'ENTERPRISE')}
            {renderSection('Crypto Native', <Zap size={20} />, nativeNews, 'CRYPTO_NATIVE')}
            {renderSection('Regulation & Policy', <ShieldCheck size={20} />, regulationNews, 'REGULATION')}
        </div>
    );
};

export default Dashboard;
