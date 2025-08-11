import { create } from 'zustand'
import { Note } from '@prisma/client'

interface FlipState {
  open: boolean,
  setOpen: () => void
}

interface NoteState {
  notes: Note[];
  id: string | null;
  title: string;
  content: string;
  setNotes: (notes: Note[]) => void;
  setNote: (note: {id: string, title: string, content: string}) => void;
  updateNoteInLocal: (id: string, updatedData: Note) => void;
  resetNote: () => void;
  changeId: (val: string | null) => void;
  changeTitle: (str: string) => void;
  changeContent: (str: string) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  id: null,
  title: "",
  content: "",

  setNotes: (notes) => set(() => ({ notes })),

  setNote: (note) =>
    set(() => ({
      id: note.id,
      title: note.title,
      content: note.content,
    })),

  updateNoteInLocal: (id, updatedData) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedData } : note
      )
  })),

  resetNote: () => set({ id: null, title: "", content: "" }),

  changeId: (val) => set(() => ({ id: val })),
  changeTitle: (str) => set(() => ({ title: str })),
  changeContent: (str) => set(() => ({ content: str })),
}));

export const usePreviewStore = create<FlipState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({open: !state.open}))
}))

export const useSidebarStore = create<FlipState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({open: !state.open}))
}))

export const useProfileStore = create<FlipState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({open: !state.open}))
}))

