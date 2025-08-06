"use client"

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/store";

const Sidebar = () => {
    const sidebarOpen = useSidebarStore((state) => state.open);

    return (
        <div className={cn("z-20 overflow-x-hidden h-screen text-neutral-300 min-w-fit bg-neutral-900 transition-all duration-300 ease-in border-neutral-800 drop-shadow-2xl py-4 ", sidebarOpen ? "px-4 border-r" : "px-0")}>
            <div className={cn("flex items-center transition-all duration-300 ease-in")}>
                <h2 className={cn("font-semibold transition-all duration-300 ease-in", sidebarOpen ? "max-w-[60px] opacity-100 " : "max-w-0 opacity-0")}>Notes</h2>
                <div></div>
            </div>
        </div>
    )
}
export default Sidebar