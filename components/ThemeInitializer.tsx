"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/store";

export function ThemeInitializer() {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
    } 
  }, [setTheme]);

  return null;
}
