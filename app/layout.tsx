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
    <html lang="en" suppressHydrationWarning className={cn("no-scrollbar")}>
      <body
        className={`min-h-screen w-full`}
      >
        <ThemeProvider>
          <ToastContainer position="top-right" closeOnClick={true} />
          <Providers session={session}>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
