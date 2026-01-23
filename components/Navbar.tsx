"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/50 border-b border-white/5 animate-fade-in-up">
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    OMER.DEV
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
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

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-neutral-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden px-6 pb-6 pt-2 border-t border-white/5 flex flex-col gap-4 bg-black/95 backdrop-blur-xl absolute left-0 right-0 top-full shadow-2xl">
                    <Link
                        href="#projects"
                        className="text-lg text-neutral-400 hover:text-white transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Projects
                    </Link>
                    <Link
                        href="#contact"
                        className="text-lg text-neutral-400 hover:text-white transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    <div className="flex items-center gap-6 py-2">
                        <Link href="https://github.com/TradersEntertainment/myportfolio.git" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                            <Github size={24} />
                        </Link>
                        <Link href="https://x.com/HyperliquidBot7" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                            <Twitter size={24} />
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
