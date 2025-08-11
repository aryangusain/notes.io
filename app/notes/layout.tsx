"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"
import { useLoadingStore } from "@/store/store"

const NoteLayout = ({children}: {children: React.ReactNode}) => {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <div className={cn("relative min-h-screen w-full flex flex-col justify-center items-center dark:bg-[#1e1e1e] dark:text-neutral-200 bg-neutral-100 text-neutral-900")}>
        {!loading && <Navbar />}
        {!loading && <Sidebar />}
        {children}  
    </div>
  )
}
export default NoteLayout