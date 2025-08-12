"use client";

import { cn } from "@/lib/utils";
import { usePreviewStore, useSearchStore, useSidebarStore } from "@/store/store";
import { useNoteStore } from "@/store/store";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import Button from "./ui/Button";
import Note from "./ui/Note";
import { toast } from "react-toastify";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const Sidebar = () => {
  const sidebarOpen = useSidebarStore((state) => state.open);
  const setSidebarOpen = useSidebarStore((state) => state.setOpen);
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);
  const currentId = useNoteStore((state) => state.id);
  const resetNote = useNoteStore((state) => state.resetNote);
  const sidebarRef = useOutsideClick(() => setSidebarOpen(false))
  const searchText = useSearchStore((state) => state.text);
  const changeSearchText = useSearchStore((state) => state.changeText);
  const setPreviewOpen = usePreviewStore((state) => state.setOpen);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete note");
        return;
      }

      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully");
      if(currentId == id) {
        resetNote();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "rounded-r-xl shadow-xl flex flex-col gap-[40px] h-full dark:bg-[#27272a] bg-neutral-200 z-20 absolute top-0 left-0 transition-all duration-200 ease-in-out py-[60px] overflow-hidden",
        sidebarOpen
          ? "w-[280px] px-[20px] opacity-100"
          : " w-0 px-[0px] opacity-0"
      )}
    >
      <IconX
        className="size-8 absolute right-4 top-4 cursor-pointer"
        onClick={() => setSidebarOpen(false)}
      />
      <div>
        <Button
          variant="primary"
          icon={<IconPlus className="size-4" />}
          className="rounded-full mb-[10px]"
          onClick={() => {resetNote(); setSidebarOpen(false); setPreviewOpen(false);}}
        >
          Create new
        </Button>
        <div className="flex items-center gap-[8px] py-2 px-4 w-full dark:bg-[#3f3f46] bg-neutral-100 rounded-full text-[14px]">
          <IconSearch className="size-4" />
          <input
            type="text"
            className="outline-none placeholder:text-neutral-400 bg-transparent w-full"
            placeholder="Search note"
            value={searchText}
            onChange={(e) => changeSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-[8px] no-scrollbar w-full">
        {notes.length > 0 ? (
          notes
            .filter((note) => note.title.toLowerCase().includes(searchText))
            .map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                onDelete={handleDelete}
              />
            ))
        ) : (
          <p className="text-neutral-500 text-sm">No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
