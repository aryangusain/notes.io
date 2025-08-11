"use client"

import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNoteStore } from '@/store/store';
import remarkBreaks from 'remark-breaks';

const Preview = () => {
    const content = useNoteStore((state) => state.content);

    return (
        <div className="absolute top-16 left-[50%] translate-x-[-50%] w-[95%] rounded-xl h-[575px] dark:bg-[#3f3f46] bg-neutral-100 outline-none py-4 px-4 z-20 no-scrollbar">
            <Markdown
                children={content}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
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
                        <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                    }
                }}
                />
        </div>
    )
}

export default Preview;
