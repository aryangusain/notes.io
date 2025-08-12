import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastContainer } from "react-toastify";

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
    <html lang="en" suppressHydrationWarning className={cn("no-scrollbar select-none")}>
      <body
        className={`min-h-screen w-full relative`}
      >
        <ThemeProvider>
          <ToastContainer 
            className="md:text-base text-sm py-2 px-4 sm:max-w-full max-w-[300px]" 
            position="top-right" 
            autoClose={3000}
            closeOnClick={true} 
            draggable={true}
          />
          <Providers session={session}>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
