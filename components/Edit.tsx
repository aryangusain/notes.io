import { useTextStore } from "@/store/store"
import React, { KeyboardEvent } from 'react';

const Edit = () => {
    const text = useTextStore((state) => state.text);
    const changeText = useTextStore((state) => state.changeText);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            const newText = text.substring(0, start) + "    " + text.substring(end);
            
            changeText(newText);
            
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
            }, 0);
        }
    };

    return (
        <div className="flex-1 border-r border-r-neutral-700">
            <div className="px-4 py-2 bg-neutral-800">
                <p className="font-semibold">Edit</p>
            </div>
            <textarea 
                className="h-full w-full outline-none py-4 px-4 resize-none no-scrollbar" 
                value={text} 
                onChange={(e) => changeText(e.target.value)}
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    )
}

export default Edit;