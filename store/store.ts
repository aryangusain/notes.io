import { create } from 'zustand'

interface ChangeState {
  text: string,
  changeText: (str: string) => void
}

interface FlipState {
  open: boolean,
  setOpen: () => void
}

interface ThemeState {
  theme: "dark" | "light",
  setTheme: (val: "dark" | "light") => void
}

export const useTitleStore = create<ChangeState>((set) => ({
  text: "",
  changeText: (str) => set(() => ({text: str}))
}))

export const useContentStore = create<ChangeState>((set) => ({
  text: "",
  changeText: (str) => set(() => ({text: str}))
}))

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

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (val) => {
    set({ theme: val });
    localStorage.setItem("theme", val);
    if (val === "dark") {
      document.documentElement.classList.add("dark");
    } 
    else {
      document.documentElement.classList.remove("dark");
    }
  },
}));
