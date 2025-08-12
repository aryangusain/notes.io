"use client";

import { IconTrash } from "@tabler/icons-react";
import { useNoteStore, useSidebarStore } from "@/store/store";

interface NoteProps {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void;
}

const Note: React.FC<NoteProps> = ({ id, title, content, onDelete }) => {
  const setNote = useNoteStore((state) => state.setNote);
  const setSidebarOpen = useSidebarStore((state) => state.setOpen);

  const handleClick = () => {
    setNote({ id, title, content });
    setSidebarOpen(false);
  };

  return (
    <div
      className="flex justify-between items-center text-[14px] cursor-pointer py-2 px-4 dark:bg-[#3f3f46] bg-neutral-100 dark:hover:bg-[#3d3d44] hover:scale-[1.01] transition-all duration-200 ease-in-out rounded-lg w-full"
      onClick={handleClick}
    >
      <span className="truncate w-[85%] font-semibold text-base">{title}</span>
      <IconTrash
        className="cursor-pointer size-5"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      />
    </div>
  );
};

export default Note;
