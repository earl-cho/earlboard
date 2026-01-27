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
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft size={18} /> BACK TO EARLBOARD
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container mx-auto px-4 max-w-4xl py-12 md:py-20">
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
                    <p className="text-lg md:text-xl font-medium leading-relaxed italic text-slate-700 dark:text-slate-300">
                        {report.summary_3lines}
                    </p>
                </div>

                {report.image_url && (
                    <div className="mb-16 aspect-video overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <img src={report.image_url} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400">
                    {report.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() ? (
                            paragraph.startsWith('###') ? (
                                <h3 key={idx} className="mt-12 mb-6 uppercase italic text-blue-600">{paragraph.replace('###', '').trim()}</h3>
                            ) : (
                                <p key={idx} className="mb-6">{paragraph}</p>
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
