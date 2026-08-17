import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "./providers";

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
  >
    <body className=" flex flex-col items-center justify-between">
      <QueryProvider>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </QueryProvider>
    </body>
  </html>
)
  ;
}