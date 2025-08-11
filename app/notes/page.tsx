"use client";

import Edit from "@/components/Edit";
import Preview from "@/components/Preview";
import { usePreviewStore } from "@/store/store";
import { useNoteStore } from "@/store/store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const previewOpen = usePreviewStore((state) => state.open);
  const setNotes = (newNotes: any[]) => useNoteStore.setState({ notes: newNotes });

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchNotes = async () => {
      try {
        const res = await fetch(`/api/notes?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data.notes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
  }, [session?.user?.email]);

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
