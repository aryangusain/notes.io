import { create } from 'zustand'
import { Note } from '@prisma/client'

interface FlipState {
  open: boolean,
  setOpen: (val: boolean) => void
  toggleState?: () => void
}

interface LoadingState {
  loading: boolean,
  setLoading: (val: boolean) => void
}

interface PreviewState {
  open: boolean,
  setOpen: (val: boolean) => void,
  previewRef: React.RefObject<HTMLDivElement | null> | null,
  setPreviewRef: (ref: React.RefObject<HTMLDivElement | null>) => void,
}

interface SearchState {
  text: string,
  changeText: (val: string) => void
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

export const usePreviewStore = create<PreviewState>((set) => ({
  open: false,
  setOpen: (val: boolean) => set(() => ({ open: val })),
  previewRef: null,
  setPreviewRef: (ref) => set(() => ({ previewRef: ref })),
}))

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (val) => set((state) => ({loading: val}))
}))

export const useSidebarStore = create<FlipState>((set) => ({
  open: false,
  setOpen: (val) => set((state) => ({open: val}))
}))

export const useProfileStore = create<FlipState>((set) => ({
  open: false,
  setOpen: (val) => set((state) => ({open: val})),
  toggleState: () => set((state) => ({open: !state.open}))
}))

export const useSearchStore = create<SearchState>((set) => ({
  text: "",
  changeText: (val) => set((state) => ({text: val})),
}))

