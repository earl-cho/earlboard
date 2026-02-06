"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BibleSidebar from '@/components/BibleSidebar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RegulationBible() {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('REGULATION PRO');
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setMounted(true);
        const savedAuth = localStorage.getItem('pro_auth');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
        fetchLatestBible();
    }, []);

    const fetchLatestBible = async () => {
        try {
            const { data, error } = await supabase
                .from('market_reports')
                .select('*')
                .contains('tags', ['REGULATION_BIBLE'])
                .order('created_at', { ascending: false })
                .limit(1);

            if (error) throw error;
            if (data && data.length > 0) {
                setContent(data[0].content);
                setTitle(data[0].title);
            }
        } catch (err) {
            console.error('Error fetching Bible:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple gating key
        if (password === 'blackboard2026') {
            setIsAuthenticated(true);
            localStorage.setItem('pro_auth', 'true');
            setErrorMsg('');
        } else {
            setErrorMsg('허가되지 않은 접근입니다.');
        }
    };

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

    if (!mounted) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 shadow-2xl text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">
                        PRO <span className="text-slate-500">Access</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-8">
                        허가된 사용자 전용 인텔리전스 섹션입니다.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="액세스 키를 입력하세요"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-center"
                        />
                        {errorMsg && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errorMsg}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                        >
                            Enter PRO Section
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 pb-16">
            {/* Header 섹션 */}
            <div className="relative h-[160px] flex items-center justify-center overflow-hidden bg-slate-950 border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase italic mb-2">
                        Regulation <span className="text-blue-500">PRO</span>
                    </h1>
                    <p className="text-slate-500 text-[9px] font-bold tracking-[0.4em] uppercase max-w-2xl mx-auto flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-slate-800" />
                        {title}
                        <span className="w-8 h-[1px] bg-slate-800" />
                    </p>
                </div>
            </div>

            {/* 본문 섹션 - 2컬럼 레이아웃 */}
            <div className="container mx-auto px-4 max-w-[1440px] mt-10 flex gap-12">
                {/* 좌측 사이드바 */}
                <BibleSidebar content={content} />

                {/* 우측 본문 */}
                <div className="flex-1 max-w-5xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden min-h-[800px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[500px] gap-4">
                            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                            <p className="premium-caps text-slate-500 animate-pulse">Syncing Intelligence...</p>
                        </div>
                    ) : content ? (
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
                                        return <h2 id={id} className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-10 mb-5 pb-1 border-b border-slate-200 dark:border-slate-800 scroll-mt-32">{children}</h2>
                                    },
                                    h3: ({ children }) => {
                                        const id = generateId(children);
                                        return <h3 id={id} className="text-md font-bold tracking-tight text-slate-800 dark:text-slate-200 mt-10 mb-3 scroll-mt-32 flex items-center gap-2">
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
                                {content}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[500px] text-slate-500">
                            <p className="premium-caps">No intelligence archived yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
