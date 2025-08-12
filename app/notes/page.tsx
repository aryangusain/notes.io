"use client";

import Edit from "@/components/Edit";
import Preview from "@/components/Preview";
import { useLoadingStore, usePreviewStore, useProfileStore, useSidebarStore } from "@/store/store";
import { useNoteStore } from "@/store/store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/Loader";
import { Note } from "@prisma/client";
import { div } from "motion/react-client";

const Page = () => {
  const previewOpen = usePreviewStore((state) => state.open);
  const setNotes = (newNotes: Note[]) => useNoteStore.setState({ notes: newNotes });

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
      finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [session?.user?.email]);


  if(loading) {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
    )
  }
  else {
    return (
      <div className="flex items-center justify-center mt-[20px] w-full">
        <div className="md:w-[600px] w-full h-[650px] relative shadow-xl">
          <Edit />
          {previewOpen && <Preview />}
        </div>
      </div>
    );
  }
};
export default Page;
