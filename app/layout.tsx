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
  openGraph: {
    type: "website",
    url: "https://notes-io-livid.vercel.app",
    title: "Notes.io",
    description: "An app that lets you edit and save notes in markdown format",
    siteName: "Notes.io",
    images: [{url: "https://github-production-user-asset-6210df.s3.amazonaws.com/97178343/481255107-e9423573-9a14-4a18-aef0-0e93c07ee570.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250823T071251Z&X-Amz-Expires=300&X-Amz-Signature=a25c0e362ed5d07d2ea01ece7df77bd3d9a4e2be6a5042fcb06e9946eca897ae&X-Amz-SignedHeaders=host"}]
  }
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
