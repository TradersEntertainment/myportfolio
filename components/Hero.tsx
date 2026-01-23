"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Available for new projects
                </div>

                <h1 className="animate-fade-in-up [animation-delay:300ms] opacity-0 text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                    Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Digital</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Experiences</span>
                </h1>

                <p className="animate-fade-in-up [animation-delay:400ms] opacity-0 max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
                    I'm a Full Stack Developer specializing in building exceptional digital products.
                    From algorithmic trading bots to real-time analytics dashboards.
                </p>

                <div className="animate-fade-in-up [animation-delay:500ms] opacity-0 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="#projects"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-white text-black px-8 text-sm font-medium shadow-lg hover:bg-neutral-200 transition-colors"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="#contact"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/5 px-8 text-sm font-medium text-white shadow-sm hover:bg-white/10 transition-colors backdrop-blur-sm group"
                    >
                        Contact Me
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="animate-fade-in [animation-delay:1000ms] opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center p-1">
                    <div className="w-1 h-1 bg-white rounded-full bg-neutral-400 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
