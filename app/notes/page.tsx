"use client";

import Edit from "@/components/Edit";
import Preview from "@/components/Preview";
import { useLoadingStore, usePreviewStore } from "@/store/store";
import { useNoteStore } from "@/store/store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/Loader";

const Page = () => {
  const previewOpen = usePreviewStore((state) => state.open);
  const setNotes = (newNotes: any[]) => useNoteStore.setState({ notes: newNotes });

  const { data: session } = useSession();
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (!session?.user?.email) return;

    
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/notes?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data.notes);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchNotes();
  }, [session?.user?.email]);


  if(loading) {
    return <Loader />
  }

  return (
    <div className="flex items-center justify-center mt-[20px] w-full">
      <div className="md:w-[600px] w-full h-[650px] relative shadow-xl">
        <Edit />
        {previewOpen && <Preview />}
      </div>
    </div>
  );
};
export default Page;
