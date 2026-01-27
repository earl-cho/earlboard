import React from 'react';
import { getReportById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';

export default async function ReportPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const report = await getReportById(id);

    if (!report) {
        notFound();
    }

    const publishedDate = new Date(report.created_at);
    const formattedDate = format(publishedDate, 'yyyy. MM. dd. HH:mm', { locale: ko });

    return (
        <article className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100">
            {/* Article Header Space */}
            <div className="container mx-auto px-4 max-w-4xl pt-12 md:pt-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 uppercase tracking-widest leading-none">
                    <ArrowLeft size={16} /> BACK TO DASHBOARD
                </Link>
                <div className="flex flex-wrap gap-2 mb-6">
                    {report.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-black tracking-widest uppercase bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md">
                            {tag}
                        </span>
                    ))}
                    <div className="flex items-center gap-2 ml-auto text-slate-400 text-xs font-bold font-mono">
                        <Clock size={14} /> {formattedDate}
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-8 uppercase italic">
                    {report.title}
                </h1>

                <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900 border-l-4 border-blue-600 rounded-r-2xl mb-12">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-3">Executive Summary</h2>
                    <p className="text-xl md:text-2xl font-medium leading-snug italic text-slate-700 dark:text-slate-300">
                        {report.summary_3lines}
                    </p>
                </div>

                {report.image_url && (
                    <div className="mb-16 aspect-video overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <img src={report.image_url} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none prose-xl md:prose-2xl prose-headings:font-black prose-headings:tracking-tight prose-p:leading-snug prose-p:text-slate-600 dark:prose-p:text-slate-400">
                    {report.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() ? (
                            paragraph.startsWith('###') ? (
                                <h3 key={idx} className="mt-12 mb-6 uppercase italic text-blue-600">{paragraph.replace('###', '').trim()}</h3>
                            ) : (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            )
                        ) : <br key={idx} />
                    ))}
                </div>

                {/* Article Footer */}
                <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">
                        END OF REPORT
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black tracking-widest text-sm hover:scale-105 transition-transform">
                        RETURN TO DASHBOARD
                    </Link>
                </div>
            </div>
        </article>
    );
}
