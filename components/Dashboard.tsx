import React from 'react';
import { getReportsBySector, getRecentReports } from '@/lib/api';
import NewsCard from './NewsCard';
import { ChevronRight, BarChart3, ShieldCheck, Zap, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const Dashboard = async () => {
    // Fetch data
    const [recentNews, enterpriseNews, nativeNews, regulationNews] = await Promise.all([
        getRecentReports(5),
        getReportsBySector('ENTERPRISE', 4),
        getReportsBySector('CRYPTO_NATIVE', 4),
        getReportsBySector('REGULATION', 4),
    ]);

    const featuredArticle = recentNews[0];
    const sideArticles = recentNews.slice(1, 5);

    const renderSection = (title: string, icon: React.ReactNode, reports: any[], sectorCode: string, variant: 'institutional' | 'data' | 'dynamic' = 'institutional') => {
        if (reports.length === 0) return null;

        return (
            <section className="mb-32">
                <div className="flex items-end justify-between mb-12 pb-6 border-b border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl rotate-3 shadow-xl">
                            {icon}
                        </div>
                        <div>
                            <p className="premium-caps text-slate-400 mb-1">{sectorCode}</p>
                            <h2 className="text-3xl font-black tracking-tighter text-slate-950 dark:text-white uppercase italic">
                                {title}
                            </h2>
                        </div>
                    </div>
                    <Link
                        href={`/sector/${sectorCode.toLowerCase()}`}
                        className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white transition-colors tracking-[0.3em] uppercase"
                    >
                        EXPLORE ARCHIVE <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Variant-specific Grids */}
                <div className={variant === 'dynamic' ? "bento-grid" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"}>
                    {reports.map((report) => (
                        <NewsCard key={report.id} report={report} variant={variant} />
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-7xl">
            {/* Featured Section: Cinematic Hero (Cursor Style) */}
            {featuredArticle && (
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Image - Cinematic XL */}
                        <div className="lg:col-span-8 group relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                            <img
                                src={featuredArticle.image_url || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&h=800&q=80'}
                                alt={featuredArticle.title}
                                className="object-cover w-full h-[600px] transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                            <div className="absolute bottom-12 left-12 right-12">
                                <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-6 inline-block">
                                    Top Intelligence
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black leading-[1.1] text-white uppercase italic tracking-tighter mb-4 text-balance">
                                    {featuredArticle.title}
                                </h3>
                                <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-3xl mb-8 line-clamp-3">
                                    {featuredArticle.summary_3lines}
                                </p>
                                <Link
                                    href={`/report/${featuredArticle.id}`}
                                    className="inline-flex items-center gap-4 text-white font-black text-sm uppercase tracking-[0.3em] border-b-2 border-white pb-2 hover:opacity-70 transition-all"
                                >
                                    OPEN DOSSIER <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Recent Briefings Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2 shrink-0">
                                <Sparkles size={20} className="text-indigo-400" />
                                <h4 className="text-lg font-black uppercase italic text-slate-400 tracking-wider">Latest Briefings</h4>
                            </div>

                            <div className="flex flex-col gap-4">
                                {sideArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/report/${article.id}`}
                                        className="group/side flex flex-col p-6 bg-white/3 dark:bg-white/2 glass rounded-[2rem] border border-white/5 hover:bg-white/5 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            {/* Changed from Time to Tag */}
                                            {article.tags && article.tags[0] ? (
                                                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[9px] font-bold uppercase tracking-widest border border-indigo-500/20">
                                                    {article.tags[0]}
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 rounded text-[9px] font-bold uppercase tracking-widest">
                                                    Analysis
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-base font-black leading-tight text-slate-900 dark:text-white uppercase italic mb-3 group-hover/side:text-indigo-400 transition-colors line-clamp-2">
                                            {article.title}
                                        </h4>

                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed opacity-60">
                                            {article.summary_3lines}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Hybrid Categorized Sections */}
            {renderSection('Regulation & Policy', <ShieldCheck size={24} />, regulationNews, 'POLICY', 'institutional')}
            {renderSection('Enterprise Adoption', <BarChart3 size={24} />, enterpriseNews, 'MARKET', 'data')}
            {renderSection('Crypto Native', <Zap size={24} />, nativeNews, 'CYPHER', 'dynamic')}
        </div>
    );
};

export default Dashboard;
