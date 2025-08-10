"use client"

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/store";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import Button from "./ui/Button";
import Note from "./ui/Note";

const Sidebar = () => {
    const sidebarOpen = useSidebarStore((state) => state.open);
    const setSidebarOpen = useSidebarStore((state) => state.setOpen);

    return (
        <div className={cn("rounded-r-xl shadow-xl flex flex-col gap-[40px] h-full dark:bg-[#27272a] bg-neutral-200 z-20 absolute top-0 left-0 transition-all duration-300 ease-in-out py-[60px] overflow-hidden", sidebarOpen ? "w-[280px] px-[20px] opacity-100" : " px-0 w-0 opacity-0")}>
            <IconX className="size-8 absolute right-4 top-4 cursor-pointer" onClick={setSidebarOpen}/>
            <div>
                <Button variant="primary" icon={<IconPlus className="size-4"/>} className="rounded-full mb-[10px]">Create new</Button>
                <div className="flex items-center gap-[8px] py-2 px-4 w-full dark:bg-[#3f3f46] bg-neutral-100 rounded-full text-[14px]">
                    <IconSearch className="size-4" />
                    <input type="text" className="outline-none placeholder:text-neutral-400" placeholder="Search note"/>
                </div>
            </div>
            <div className="flex flex-col items-center gap-[8px] no-scrollbar">
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
            </div>
        </div>
    )
}
export default Sidebar