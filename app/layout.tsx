import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevDirectory",
  description: "Find and connect with developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-gray-50 dark:bg-gray-950 min-h-screen`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
