import { create } from 'zustand'

interface SidebarState {
    open: boolean,
    flipState: () => void
}

interface TabState {
  active: "edit" | "preview",
  setState: (by: "edit" | "preview") => void
}

interface TextState {
  text: string,
  changeText: (str: string) => void
}

export const useTextStore = create<TextState>((set) => ({
  text: "",
  changeText: (str) => set(() => ({text: str}))
}))

export const useTabStore = create<TabState>((set) => ({
  active: "edit",
  setState: (name) => set(() => ({active: name}))
}))

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  flipState: () => set((state) => ({open: !state.open}))
}))
