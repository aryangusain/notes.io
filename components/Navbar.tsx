"use client"

import { IconLayoutSidebar, IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./ui/Button";
import { useProfileStore, useSidebarStore } from "@/store/store";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
    const {data: session} = useSession();

    const setSidebarOpen = useSidebarStore((state) => state.setOpen);
    const tabOpen = useProfileStore((state) => state.open);
    const setTabOpen = useProfileStore((state) => state.setOpen);
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; 

    return (
        <div className="flex items-center md:w-[600px] w-full justify-between md:py-[10px] px-[10px] py-[6px] bg-transparent">
            <IconLayoutSidebar onClick={setSidebarOpen} className="h-[28px] w-[28px] md:absolute left-[20px] cursor-pointer"/>
            <div className="text-[28px] md:text-[32px]  font-semibold"><Link href='/' className="no-underline dark:text-neutral-200 text-neutral-900">Notes.io</Link></div>
            <div className="flex items-center justify-center relative">
                {   
                    (theme === "dark") ?
                    <IconSun onClick={() => setTheme("light")} className="h-[28px] w-[28px] md:mr-[40px] mr-[20px] cursor-pointer text-neutral-100"/>
                    :
                    <IconMoon onClick={() => setTheme("dark")} className="h-[24px] w-[24px] md:mr-[40px] mr-[20px] cursor-pointer text-neutral-900"/>
                }   
                { session?.user?.image && 
                    <img src={session?.user?.image} onClick={setTabOpen} alt="user image" className="cursor-pointer rounded-full h-[32px] w-[32px]"/>
                }
                {
                    tabOpen &&
                    <div className="dark:bg-[#27272a] bg-neutral-200 z-30 absolute top-10 -right-2 flex flex-col gap-[16px] py-[20px] px-[60px] shadow-xl rounded-xl items-center">
                        <div className="flex flex-col items-center gap-[4px]">
                            <img src={session?.user?.image || ""} onClick={() => {}} alt="user image" className="rounded-full h-[48px] w-[48px] shadow-md border border-neutral-300"/>
                            <div className="font-semibold text-[18px]">Hi, {session?.user?.name?.split(' ')[0]}!</div>
                        </div>
                        <Button variant="primary" icon={<IconLogout className="size-4"/>} onClick={() => signOut()}>Logout</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
