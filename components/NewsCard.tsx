import React from 'react';
import { MarketReport } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
    report: MarketReport;
}

const NewsCard: React.FC<NewsCardProps> = ({ report }) => {
    const publishedAt = new Date(report.created_at);
    const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true, locale: ko });

    return (
        <div className="group flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
            {/* Image Container 16:9 */}
            <Link href={`/report/${report.id}`} className="block relative aspect-video overflow-hidden">
                <img
                    src={report.image_url || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80'}
                    alt={report.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                    {report.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href={`/report/${report.id}`} className="block mb-2">
                    <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        {report.title}
                    </h3>
                </Link>

                <p className="text-base text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-snug">
                    {report.summary_3lines}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-slate-400 uppercase tracking-tighter">
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{timeAgo}</span>
                    </div>
                    <Link href={`/report/${report.id}`} className="flex items-center gap-1 text-slate-950 dark:text-white font-black hover:opacity-70 transition-opacity">
                        READ FULL <ExternalLink size={10} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
