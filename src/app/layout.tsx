import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "BookIt",
    template: "%s | BookIt",
  },
  description:
    "Book mentors, join study groups, and manage learning sessions without scheduling conflicts.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
