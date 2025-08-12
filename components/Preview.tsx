"use client"

import React, { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNoteStore, usePreviewStore } from '@/store/store';
import remarkBreaks from 'remark-breaks';

const Preview = () => {
    const content = useNoteStore((state) => state.content);
    const previewRef = useRef<HTMLDivElement>(null);
    const setPreviewRef = usePreviewStore(state => state.setPreviewRef);

    useEffect(() => {
        setPreviewRef(previewRef);
    }, [setPreviewRef]);

    return (
        <div 
            ref={previewRef}
            className="absolute top-16 left-[50%] translate-x-[-50%] w-[95%] rounded-xl h-[575px] dark:bg-[#3f3f46] bg-neutral-100 outline-none py-4 px-4 z-10 no-scrollbar overflow-auto"
            style={{
                fontSize: '14px',
                lineHeight: '1.6',
                fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            }}
        >
            <Markdown
                children={content}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Headings with GitHub-style styling
                    h1: ({ children, ...props }) => (
                        <h1 className="text-3xl font-semibold mb-4 mt-6 pb-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2 className="text-2xl font-semibold mb-3 mt-6 pb-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3 className="text-xl font-semibold mb-2 mt-5 text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </h3>
                    ),
                    h4: ({ children, ...props }) => (
                        <h4 className="text-lg font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </h4>
                    ),
                    h5: ({ children, ...props }) => (
                        <h5 className="text-base font-semibold mb-1 mt-3 text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </h5>
                    ),
                    h6: ({ children, ...props }) => (
                        <h6 className="text-sm font-semibold mb-1 mt-3 text-gray-600 dark:text-gray-400" {...props}>
                            {children}
                        </h6>
                    ),
                    
                    // Paragraphs with proper spacing
                    p: ({ children, ...props }) => (
                        <p className="mb-4 text-gray-800 dark:text-gray-200 leading-relaxed" {...props}>
                            {children}
                        </p>
                    ),
                    
                    // Lists with GitHub styling
                    ul: ({ children, ...props }) => (
                        <ul className="mb-4 pl-6 space-y-1 text-gray-800 dark:text-gray-200" {...props}>
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol className="mb-4 pl-6 space-y-1 text-gray-800 dark:text-gray-200" {...props}>
                            {children}
                        </ol>
                    ),
                    li: ({ children, ...props }) => (
                        <li className="leading-relaxed" style={{ listStyleType: 'inherit' }} {...props}>
                            {children}
                        </li>
                    ),
                    
                    // Blockquotes
                    blockquote: ({ children, ...props }) => (
                        <blockquote className="mb-4 pl-4 py-2 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 italic" {...props}>
                            {children}
                        </blockquote>
                    ),
                    
                    // Tables
                    table: ({ children, ...props }) => (
                        <div className="mb-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children, ...props }) => (
                        <thead className="bg-gray-100 dark:bg-gray-700" {...props}>
                            {children}
                        </thead>
                    ),
                    th: ({ children, ...props }) => (
                        <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </th>
                    ),
                    td: ({ children, ...props }) => (
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-200" {...props}>
                            {children}
                        </td>
                    ),
                    
                    // Horizontal rule
                    hr: ({ ...props }) => (
                        <hr className="my-6 border-t-2 border-gray-300 dark:border-gray-600" {...props} />
                    ),
                    
                    // Links
                    a: ({ children, href, ...props }) => (
                        <a 
                            href={href} 
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    
                    // Strong/Bold text
                    strong: ({ children, ...props }) => (
                        <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
                            {children}
                        </strong>
                    ),
                    
                    // Emphasis/Italic text
                    em: ({ children, ...props }) => (
                        <em className="italic text-gray-800 dark:text-gray-200" {...props}>
                            {children}
                        </em>
                    ),
                    
                    // Strikethrough
                    del: ({ children, ...props }) => (
                        <del className="line-through text-gray-600 dark:text-gray-400" {...props}>
                            {children}
                        </del>
                    ),
                    
                    // Code blocks and inline code
                    //@ts-expect-error
                    code({
                        inline,
                        className,
                        children,
                        ...props
                    }: {
                        inline?: boolean;
                        className?: string;
                        children: React.ReactNode;
                    }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="mb-4">
                                <SyntaxHighlighter
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        lineHeight: '1.45',
                                        padding: '16px',
                                        margin: 0,
                                        backgroundColor: '#0d1117',
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code 
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" 
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    
                    // Line breaks - this is key for Enter behavior
                    br: ({ ...props }) => (
                        <br {...props} />
                    ),
                }}
            />
        </div>
    )
}

export default Preview;