import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earlboard | Digital Asset Intelligence",
  description: "Advanced market reports and regulatory analysis for the digital asset economy.",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50 dark:bg-black flex flex-col`}
      >
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-16">
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-xl font-black tracking-tighter text-slate-950 dark:text-white uppercase italic">
                BLOCKCHAIN <span className="text-blue-600">MONITOR</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">
                Digital Asset Market Intelligence & Institutional Insight
              </p>
            </div>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">
              © 2026 Earlboard Research. Powered by Blackboard Intelligence.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
