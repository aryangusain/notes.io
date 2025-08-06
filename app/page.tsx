"use client";

import Edit from "@/components/Edit";
import Navbar from "@/components/Navbar";
import Options from "@/components/Options";
import Preview from "@/components/Preview";
import Sidebar from "@/components/Sidebar";
import { useTabStore } from "@/store/store";

export default function Home() {
  const activeTab = useTabStore((state) => state.active);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <div className="fixed top-0 left-0 flex w-full drop-shadow-2xl"> */}
        {/* <Sidebar /> */}
        <Navbar />
      {/* </div> */}
      <div className="flex w-full">
        <Edit />
        <Preview />
      </div>
    </div>
  );
}
