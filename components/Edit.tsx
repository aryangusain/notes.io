"use client"

import React, { KeyboardEvent } from 'react';
import Button from "./ui/Button";
import { IconDeviceFloppy, IconEye, IconFile, IconPdf } from "@tabler/icons-react";
import { useContentStore, usePreviewStore, useTitleStore } from '@/store/store';

const Edit = () => {
    const title = useTitleStore((state) => state.text);
    const changeTitle = useTitleStore((state) => state.changeText);
    const content = useContentStore((state) => state.text)
    const changeContent = useContentStore((state) => state.changeText);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newText = content.substring(0, start) + "    " + content.substring(end);
            changeContent(newText);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
            }, 0);
        }
    };

    const setPreviewOpen = usePreviewStore((state) => state.setOpen);

    return (
        <div className="w-full h-full dark:bg-[#27272a] bg-neutral-200 rounded-xl px-4 py-3 flex flex-col gap-[20px] shadow-md">
            <div className="flex justify-between items-center ">
                <div className="flex gap-[10px] ">
                    <Button variant="secondary" icon={<IconEye className="size-4"/>} onClick={setPreviewOpen}>Preview</Button>
                    <Button variant="secondary" icon={<IconFile className="size-4"/>}>Export</Button>
                </div>
                <Button variant="primary" icon={<IconDeviceFloppy className="size-4"/>}>Save</Button>
            </div>
            <input 
                type="text" 
                value={title}
                onChange={(e) => changeTitle(e.target.value)}
                className="dark:bg-[#3f3f46] shadow-md bg-neutral-100 px-3 py-2 rounded-lg outline-none" placeholder='title'
            />
            <textarea 
                value={content}
                onChange={(e) => changeContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="dark:bg-[#3f3f46] shadow-md bg-neutral-100 rounded-lg h-full outline-none py-2 px-3 resize-none no-scrollbar -mt-[10px]"
                placeholder='content' 
            ></textarea>
        </div>
    )
}

export default Edit;