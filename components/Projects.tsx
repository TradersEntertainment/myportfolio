"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
    github?: string;
}

const projects: Project[] = [
    {
        title: "Trader Battle",
        description: "Gamified investment simulator where you compete against legendary traders like Warren Buffett in historical market scenarios. Features AI portraits and real-time PnL tracking.",
        tags: ["Next.js", "Gamification", "Typescript", "Tailwind"],
        image: "/assets/trader-battle.png",
        link: "https://tradersdecision.vercel.app/",
        github: "https://github.com/TradersEntertainment/tradersdecision",
    },
    {
        title: "Bar Wars",
        description: "Gaming and betting focused daily prediction market on Base Protocol. Battle with bars.",
        tags: ["React", "Base Protocol", "Gaming", "Prediction Market"],
        image: "/assets/bar-wars.png",
        link: "https://candlewars.up.railway.app/",
        github: undefined,
    },
    {
        title: "PolymarketBar",
        description: "Real-time crypto betting aid dashboard. Features live odds, PnL tracking, and market visualization using FastAPI and React.",
        tags: ["React", "FastAPI", "Python", "WebSockets"],
        image: "/assets/polymarket-bar.png",
        link: "https://polymarketbar-production.up.railway.app/",
        github: "https://github.com/TradersEntertainment/polymarketbar",
    },
    {
        title: "Whale Analyzer",
        description: "Advanced analytics tool for detecting large cryptocurrency movements ('whales') across multiple exchanges to predict price action.",
        tags: ["Python", "Pandas", "Data Science", "Visualization"],
        image: "/assets/polymarket-analyzer.png",
        link: "https://x.com/HyperliquidBot7",
        github: "https://github.com/TradersEntertainment/hl-liq-tracker",
    },
    {
        title: "Hyperliquid Wallet Tracker",
        description: "Real-time tracking of top traders and specific wallets on Hyperliquid. Monitor positions, PnL, and trade history.",
        tags: ["Python", "Telegram Bot", "Analytics", "Tracking"],
        image: "/assets/hyperliquid-bot.png",
        link: "https://choosewalletstotrack.up.railway.app/",
        github: "https://github.com/TradersEntertainment/wallettrackerwebsiteTG",
    },
    {
        title: "CozyTally",
        description: "A cute and aesthetic daily habit tracker and counter. Features interactive tally marks and a cozy atmosphere.",
        tags: ["React", "CSS", "Frontend", "Utility"],
        image: "/assets/cozy-tally.png",
        link: "https://cozytally.vercel.app/",
        github: "https://github.com/TradersEntertainment/cozytally",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-black/50 relative">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        A selection of my recent work in fintech, automation, and full-stack development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards] group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {project.github && (
                                        <Link href={project.github} className="p-2 bg-white rounded-full text-black hover:bg-neutral-200 transition-colors">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {project.link && (
                                        <Link href={project.link} className="p-2 bg-white rounded-full text-black hover:bg-neutral-200 transition-colors">
                                            <ExternalLink size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
