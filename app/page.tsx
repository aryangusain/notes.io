"use client";

import { cn } from "@/lib/utils";
import { IconDoorEnter } from "@tabler/icons-react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Loader } from "@/components/ui/Loader";
import { useLoadingStore } from "@/store/store";

export default function Home() {
  const { data: session, status } = useSession();
  const setLoading = useLoadingStore((state) => state.setLoading);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-900">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-start items-center pt-[100px] px-[20px] gap-[20px] md:gap-[60px] bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
      )}
    >
      <p className="text-[14px] md:text-[30px] dark:text-neutral-200 text-neutral-900 font-semibold text-center">
        Write in Markdown - Export as PDF - Save forever
      </p>

      <h1 className="font-semibold text-[76px]/20 md:text-[132px] md:-mt-[20px] text-violet-600 ">
        Notes.io
      </h1>

      <p className="text-[10px] md:text-[16px] px-[40px] max-w-fit text-neutral-400 font-semibold text-center">
        A clean, fast note-taking app that lets you format with <br /> Markdown,
        turn notes into polished PDFs, and store <br />
        them securely in a database.
      </p>

      {session ? (
        <Link
          onClick={() => setLoading(true)}
          href="/notes"
          className="no-underline px-4 md:py-2 py-1.5 bg-white shadow-md dark:border-0 border border-neutral-400 hover:bg-neutral-100 text-black font-semibold rounded-lg text-[10px] md:text-[12px] md:-mt-[20px]"
        >
          <button className="cursor-pointer text-[14px] flex items-center gap-[4px]">
            <IconDoorEnter className="size-4" />
            <span>Go to Notes</span>
          </button>
        </Link>
      ) : (
        <button
          onClick={() => { setLoading(true); signIn("google", { callbackUrl: "/notes" });}}
          className="flex gap-2 items-center px-4 md:py-2 py-1.5 bg-white shadow-md border border-neutral-300 hover:bg-neutral-100 cursor-pointer text-black rounded-lg text-[10px] md:text-[12px] md:-mt-[20px]"
        >
          <img src="/google_logo.svg" className="size-4 md:size-5" />
          <span>Get Started with Google</span>
        </button>
      )}
    </div>
  );
}
