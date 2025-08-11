"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={cn("relative min-h-screen w-full flex flex-col justify-center items-center dark:bg-[#1e1e1e] dark:text-neutral-200 bg-neutral-100 text-neutral-900")}>
        <Navbar />
        <Sidebar />
        {children}  
    </div>
  )
}
export default layout