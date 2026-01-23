"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/50 border-b border-white/5 animate-fade-in-up"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                OMER.DEV
            </Link>

            <div className="flex items-center gap-6">
                <Link href="#projects" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Projects
                </Link>
                <Link href="#contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Contact
                </Link>
                <div className="w-px h-4 bg-white/10 mx-2" />
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/TradersEntertainment/myportfolio.git" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </Link>
                    <Link href="https://x.com/HyperliquidBot7" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                        <Twitter size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
