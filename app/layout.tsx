import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/store";
import { ThemeInitializer } from "@/components/ThemeInitializer";

export const metadata: Metadata = {
  title: "Notes.io",
  description: "Create and Edit markdown files and export them as pdf",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  
  return (
    <html lang="en" className={cn("no-scrollbar")}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`min-h-screen w-full`}
      >
        <Providers session={session}>
          <ThemeInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
