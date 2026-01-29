import React from 'react';
import { MarketReport } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { ExternalLink, Clock, ArrowRight } from 'lucide-react';

interface NewsCardProps {
    report: MarketReport;
    variant?: 'institutional' | 'data' | 'dynamic';
}

const NewsCard: React.FC<NewsCardProps> = ({ report, variant = 'institutional' }) => {
    const publishedAt = new Date(report.created_at);
    const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true, locale: ko });

    // Variant-specific styles
    const cardStyles = {
        institutional: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
        data: "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/5",
        dynamic: "bg-white dark:bg-slate-900 border-slate-200 dark:border-indigo-500/20 glow-indigo"
    };

    // Variant-specific fallback images
    const fallbackImages = {
        institutional: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Architecture/Building
        data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Data Vis
        dynamic: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80" // Abstract/Crypto
    };

    return (
        <div className={`group flex flex-col h-full overflow-hidden transition-all duration-500 border rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 ${cardStyles[variant]}`}>
            {/* Image Container 16:9 */}
            <Link href={`/report/${report.id}`} className="block relative aspect-video overflow-hidden">
                <img
                    src={report.image_url || fallbackImages[variant]}
                    alt={report.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {variant === 'dynamic' && (
                    <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">
                            Native
                        </span>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {report.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="premium-caps text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-0.5">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href={`/report/${report.id}`} className="block mb-3">
                    <h3 className={`text-xl font-black leading-tight text-slate-900 dark:text-white uppercase italic transition-all duration-300 ${variant === 'institutional' ? 'tracking-tighter' : 'tracking-tight'}`}>
                        {report.title}
                    </h3>
                </Link>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {report.summary_3lines}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock size={12} />
                        <span>{timeAgo}</span>
                    </div>
                    <Link href={`/report/${report.id}`} className="group/btn flex items-center gap-1 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:opacity-70 transition-all">
                        INSIGHT <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
