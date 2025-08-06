import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes.io",
  description: "Create and Edit markdown files and export them as pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={`bg-neutral-900 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
