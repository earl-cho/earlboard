import React from 'react';
import { getReportById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BibleSidebar from '@/components/BibleSidebar';

export default async function ReportPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const report = await getReportById(id);

    if (!report) {
        notFound();
    }

    const publishedDate = new Date(report.created_at);
    const formattedDate = format(publishedDate, 'yyyy. MM. dd. HH:mm', { locale: ko });

    // ID 생성을 위한 함수 (Regulation Bible과 동일)
    const generateId = (text: any) => {
        if (typeof text !== 'string') {
            if (Array.isArray(text)) {
                return text.map(t => typeof t === 'string' ? t : '').join('')
                    .toLowerCase()
                    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '')
                    .replace(/\s+/g, '-');
            }
            return '';
        }
        return text
            .toLowerCase()
            .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '')
            .replace(/\s+/g, '-');
    };

    return (
        <article className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 pb-20">
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

                <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-[1.1] mb-8 uppercase italic">
                    {report.title}
                </h1>

                <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900 border-l-4 border-blue-600 rounded-lg mb-12">
                    <h2 className="premium-caps text-blue-600 mb-3 ml-0">Executive Summary</h2>
                    <p className="text-[15px] md:text-[16px] font-semibold leading-relaxed text-slate-700 dark:text-slate-300 antialiased">
                        {report.summary_3lines}
                    </p>
                </div>

                {report.image_url && (
                    <div className="mb-16 aspect-video overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <img src={report.image_url} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* 본문 섹션 - 2컬럼 레이아웃 (Bible Sidebar + Content) */}
            <div className="container mx-auto px-4 max-w-[1440px] flex gap-12">
                {/* 좌측 사이드바 */}
                <BibleSidebar content={report.content} />

                {/* 우측 본문 */}
                <div className="flex-1 max-w-5xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden min-h-[800px]">
                    <div className="p-8 md:p-14 lg:p-20 prose prose-slate dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => {
                                    const id = generateId(children);
                                    return <h1 id={id} className="text-xl font-black tracking-tight text-slate-900 dark:text-white mt-12 mb-8 border-b-2 pb-4 border-slate-900 dark:border-white uppercase scroll-mt-32 flex items-baseline gap-3">
                                        <span className="text-slate-300 dark:text-slate-700 font-serif italic text-2xl">#</span>
                                        {children}
                                    </h1>
                                },
                                h2: ({ children }) => {
                                    const id = generateId(children);
                                    return <h2 id={id} className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-10 mb-5 pb-1 border-b border-slate-200 dark:border-slate-800 scroll-mt-32">
                                        {children}
                                    </h2>
                                },
                                h3: ({ children }) => {
                                    const id = generateId(children);
                                    return <h3 id={id} className="text-md font-extrabold tracking-tight text-slate-800 dark:text-slate-200 mt-10 mb-3 scroll-mt-32 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        {children}
                                    </h3>
                                },
                                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-5" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-5" {...props} />,
                                li: ({ node, ...props }) => <li className="text-slate-700 dark:text-slate-300 text-[14px] leading-[1.7] mb-1.5" {...props} />,
                                p: ({ node, ...props }) => <p className="text-slate-700 dark:text-slate-300 text-[14px] leading-[1.7] mb-5 text-justify antialiased font-medium tracking-tight" {...props} />,
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm">
                                        <table className="w-full text-[12px] border-collapse bg-white dark:bg-black/20" {...props} />
                                    </div>
                                ),
                                thead: ({ node, ...props }) => <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-black uppercase tracking-widest text-[10px]" {...props} />,
                                th: ({ node, ...props }) => <th className="p-3 text-left border-x border-slate-200 dark:border-slate-800" {...props} />,
                                td: ({ node, ...props }) => <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium" {...props} />,
                                hr: () => <hr className="my-12 border-slate-200 dark:border-slate-800 opacity-50" />,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-500/50 pl-6 py-2 my-6 italic text-slate-600 dark:text-slate-400 bg-blue-500/5 dark:bg-blue-500/5 rounded-r font-serif text-base">
                                        {children}
                                    </blockquote>
                                ),
                                strong: ({ children }) => <strong className="font-extrabold text-slate-900 dark:text-white underline decoration-blue-500/30 decoration-2 underline-offset-2">{children}</strong>
                            }}
                        >
                            {report.content}
                        </ReactMarkdown>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-12 mb-20 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="premium-caps text-slate-400 mb-8 tracking-[0.4em]">
                            END OF REPORT
                        </p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black tracking-widest text-sm hover:scale-105 transition-transform">
                            RETURN TO DASHBOARD
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
