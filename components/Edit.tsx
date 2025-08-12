"use client";

import React, { KeyboardEvent, useState } from "react";
import Button from "./ui/Button";
import { IconDeviceFloppy, IconEye, IconFile } from "@tabler/icons-react";
import { usePreviewStore, useNoteStore, useLoadingStore } from "@/store/store";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Loader } from "./ui/Loader";
import html2pdf from 'html2pdf.js';

const Edit = () => {
  const id = useNoteStore((state) => state.id);
  const title = useNoteStore((state) => state.title);
  const changeTitle = useNoteStore((state) => state.changeTitle);
  const content = useNoteStore((state) => state.content);
  const changeContent = useNoteStore((state) => state.changeContent);
  const updateLocalArray = useNoteStore((state) => state.updateNoteInLocal);
  const previewOpen = usePreviewStore((state) => state.open);
  const setPreviewOpen = usePreviewStore((state) => state.setOpen);
  const setNotes = useNoteStore((state) => state.setNotes);
  const notes = useNoteStore((state) => state.notes);
  const changeId = useNoteStore((state) => state.changeId);
  const { data: session } = useSession();
  const loading = useLoadingStore((state) => state.loading);
  const [saving, setSaving] = useState(false);
  // const previewRef = usePreviewStore(state => state.previewRef);

  // const exportPDF = async () => {
  //   try {
  //     // Ensure preview is open and wait for it to render
  //     if (!previewOpen) {
  //       toast.info("Opening preview for export...");
  //       setPreviewOpen(true);
  //     }

  //     // Wait for preview to be available and rendered
  //     let attempts = 0;
  //     const maxAttempts = 20; // 4 seconds total wait time
      
  //     while ((!previewRef?.current || !previewRef.current.innerHTML.trim()) && attempts < maxAttempts) {
  //       await new Promise(resolve => setTimeout(resolve, 200));
  //       attempts++;
  //     }

  //     if (!previewRef?.current) {
  //       toast.error("Preview not available for export. Please try again.");
  //       console.log('Preview ref not available after waiting');
  //       return;
  //     }

  //     // Check if the element has content
  //     if (!previewRef.current.innerHTML.trim()) {
  //       toast.error("No content available for export");
  //       return;
  //     }

  //     const filename = title.trim() || 'preview';
      
  //     // Clone the element to avoid affecting the original
  //     const clonedElement = previewRef.current.cloneNode(true) as HTMLElement;
      
  //     // Apply styles to ensure text renders properly
  //     clonedElement.style.color = '#000000';
  //     clonedElement.style.backgroundColor = '#ffffff';
  //     clonedElement.style.fontFamily = 'Arial, sans-serif';
  //     clonedElement.style.fontSize = '14px';
  //     clonedElement.style.lineHeight = '1.5';
  //     clonedElement.style.padding = '20px';
  //     clonedElement.style.width = '100%';
  //     clonedElement.style.height = 'auto';
  //     clonedElement.style.overflow = 'visible';
      
  //     // Override any problematic styles in child elements
  //     const allElements = clonedElement.querySelectorAll('*');
  //     allElements.forEach((el: Element) => {
  //       const htmlEl = el as HTMLElement;
  //       htmlEl.style.color = 'inherit';
  //       htmlEl.style.backgroundColor = 'transparent';
  //       // Remove transform properties that can cause issues
  //       htmlEl.style.transform = 'none';
  //       htmlEl.style.position = 'static';
  //     });

  //     const opt = {
  //       margin: 0.5,
  //       filename: `${filename}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { 
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: true,
  //         backgroundColor: '#ffffff',
  //         logging: false,
  //         letterRendering: true,
  //         foreignObjectRendering: true
  //       },
  //       jsPDF: { 
  //         unit: 'in', 
  //         format: 'letter', 
  //         orientation: 'portrait' 
  //       },
  //     };

  //     toast.info("Generating PDF...");
      
  //     await html2pdf().set(opt).from(clonedElement).save();
  //     toast.success("PDF exported successfully!");
  //     console.log('exported correctly');
      
  //   } catch (error) {
  //     console.error('Export error:', error);
  //     toast.error("Failed to export PDF");
  //   }
  // };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    try {
      setSaving(true);
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
        changeId(data.note.id);
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
    finally {
      setSaving(false);
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

  if (loading) {
    return <Loader />
  } else {
    return (
      <div className="select-text w-full h-full dark:bg-[#27272a] bg-neutral-200 rounded-xl px-4 py-3 flex flex-col gap-[20px] shadow-md">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[10px] ">
            <Button
              variant="secondary"
              icon={<IconEye className="size-4" />}
              onClick={() => setPreviewOpen(!previewOpen)}
            >
              Preview
            </Button>
            {/* <Button 
              onClick={exportPDF} 
              variant="secondary" 
              icon={<IconFile className="size-4" />}
            >
              Export
            </Button> */}
          </div>
          {
            (saving) ?
              <Button
                variant="primary"
                className="text-sm text-neutral-500"
                >
                saving...
              </Button>
            :
              <Button
              variant="primary"
              icon={<IconDeviceFloppy className="size-4" />}
              onClick={handleSave}
              >
                Save
              </Button>
          }
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
        />
      </div>
    );
  }
};

export default Edit;