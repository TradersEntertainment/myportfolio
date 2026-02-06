import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MatrixDragon } from "@/components/MatrixDragon";
import { Tracker } from "@/components/Tracker";

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
        <MatrixDragon />
        {children}
      </body>
    </html>
  );
}
