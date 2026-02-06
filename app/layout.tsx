import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Tracker } from "@/components/Tracker";
import { Dragon3D } from "@/components/Dragon3D";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omer | Full Stack Developer",
  description: "Portfolio of a Full Stack Developer specializing in crypto and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={outfit.className}>
        <Navbar />
        <Tracker />
        <Dragon3D />
        {children}
      </body>
    </html>
  );
}
