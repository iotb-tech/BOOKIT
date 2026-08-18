import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { QueryProvider } from "@/components/auth/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookIt",
  description: "BookIt is the ultimate booking solution for your needs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-blue-950 antialiased`}
      title="BookIt - The Ultimate Booking Solution"

      // theme-color="light dark"
    >
       <body className="min-h-full flex flex-col">
  <Navbar />
  <QueryProvider>{children}</QueryProvider>
</body>
    </html>
  );
}
