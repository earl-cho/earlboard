"use client";

import React, { useEffect, useState } from 'react';

interface HeaderItem {
    id: string;
    text: string;
    level: number;
}

interface BibleSidebarProps {
    content: string;
}

const BibleSidebar: React.FC<BibleSidebarProps> = ({ content }) => {
    const [headers, setHeaders] = useState<HeaderItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Extract headers from markdown content
        const lines = content.split('\n');
        const extractedHeaders: HeaderItem[] = [];

        lines.forEach((line) => {
            const match = line.match(/^(#{1,3})\s+(.*)/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                // Create a slug-like ID
                const id = text
                    .toLowerCase()
                    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '')
                    .replace(/\s+/g, '-');

                extractedHeaders.push({ id, text, level });
            }
        });

        setHeaders(extractedHeaders);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0% -80% 0%' }
        );

        headers.forEach((header) => {
            const element = document.getElementById(header.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headers]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (headers.length === 0) return null;

    return (
        <aside className="hidden xl:block w-72 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pr-4">
            <div className="flex flex-col gap-1 border-l border-slate-200 dark:border-slate-800 ml-2">
                <p className="premium-caps text-slate-400 mb-4 ml-6">Table of Contents</p>
                {headers.map((header, index) => (
                    <button
                        key={`${header.id}-${index}`}
                        onClick={() => scrollToSection(header.id)}
                        className={`
                            text-left py-1.5 transition-all duration-200 border-l-2 -ml-[1px]
                            ${header.level === 1 ? 'pl-6 font-black text-[11px] uppercase tracking-wider' : ''}
                            ${header.level === 2 ? 'pl-10 font-bold text-[10px] text-slate-500' : ''}
                            ${header.level === 3 ? 'pl-14 text-[10px] text-slate-400 italic' : ''}
                            ${activeId === header.id
                                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white bg-slate-100/50 dark:bg-white/5'
                                : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300'}
                        `}
                    >
                        {header.text}
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default BibleSidebar;
