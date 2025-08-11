"use client";

import React, { KeyboardEvent } from "react";
import Button from "./ui/Button";
import { IconDeviceFloppy, IconEye, IconFile } from "@tabler/icons-react";
import { usePreviewStore, useNoteStore } from "@/store/store";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Edit = () => {
  const id = useNoteStore((state) => state.id);
  const title = useNoteStore((state) => state.title);
  const changeTitle = useNoteStore((state) => state.changeTitle);
  const content = useNoteStore((state) => state.content);
  const changeContent = useNoteStore((state) => state.changeContent);
  const updateLocalArray = useNoteStore((state) => state.updateNoteInLocal);
  const setPreviewOpen = usePreviewStore((state) => state.setOpen);
  const setNotes = useNoteStore((state) => state.setNotes);
  const notes = useNoteStore((state) => state.notes);
  const {data: session, status} = useSession();

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      let res;
      let data;

      if (id) {
        // Update existing note
        res = await fetch(`/api/notes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        data = await res.json();
        updateLocalArray(id, data.note);
      } 
      else {
        // Create new note
        res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, email: session?.user?.email }),
        });
        data = await res.json();
        const newNotes = [...notes, data.note];
        console.log(newNotes);
        setNotes(newNotes);
      }

      if (res.ok) {
        toast.success(data.message || "Note saved successfully");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } 
    catch (err) {
      toast.error("Failed to save note");
      console.log(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        content.substring(0, start) + "    " + content.substring(end);
      changeContent(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="w-full h-full dark:bg-[#27272a] bg-neutral-200 rounded-xl px-4 py-3 flex flex-col gap-[20px] shadow-md">
      <div className="flex justify-between items-center ">
        <div className="flex gap-[10px] ">
          <Button
            variant="secondary"
            icon={<IconEye className="size-4" />}
            onClick={setPreviewOpen}
          >
            Preview
          </Button>
          <Button variant="secondary" icon={<IconFile className="size-4" />}>
            Export
          </Button>
        </div>
        <Button
          variant="primary"
          icon={<IconDeviceFloppy className="size-4" />}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => changeTitle(e.target.value)}
        className="dark:bg-[#3f3f46] shadow-md bg-neutral-100 px-3 py-2 rounded-lg outline-none"
        placeholder="title"
      />

      <textarea
        value={content}
        onChange={(e) => changeContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="dark:bg-[#3f3f46] shadow-md bg-neutral-100 rounded-lg h-full outline-none py-2 px-3 resize-none no-scrollbar -mt-[10px]"
        placeholder="content"
      ></textarea>
    </div>
  );
};

export default Edit;