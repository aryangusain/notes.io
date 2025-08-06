"use client"

import { IconLayoutSidebar } from "@tabler/icons-react"
import { useSidebarStore } from "@/store/store";

const Navbar = () => {
    const setSidebarOpen = useSidebarStore((state) => state.flipState);

    return (
        <div className="z-20 w-full h-fit px-2 py-3 bg-neutral-900 border-b border-b-neutral-800 flex justify-center items-center gap-4">
            {/* <IconLayoutSidebar onClick={setSidebarOpen} className="cursor-pointer text-neutral-300 "/> */}
            <h1 className="text-3xl font-bold text-indigo-300  pb-1">Notes.io</h1>
        </div>
    )
}
export default Navbar