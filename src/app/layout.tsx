import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import ReactQueryProvider from "@/core/ReactQueryProvider";
import Navigation from "@/core/components/molecules/Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-slate-900 text-white p-4 text-center text-2xl">
          <Navigation />
        </header>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
