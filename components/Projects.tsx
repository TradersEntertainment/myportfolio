"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    /** Screenshot under /public/assets. Projects without one get a generated cover. */
    image?: string;
    link?: string;
    github?: string;
}

const tradingProjects: Project[] = [
    {
        title: "StrategyFactory AI",
        description: "Quantitative trading platform that turns plain-English strategy descriptions into executable logic, backtests them candle-by-candle, paper-trades the result and deploys to Hyperliquid through API agents. Drawdown analysis and stop-loss enforcement built in.",
        tags: ["React", "TypeScript", "Gemini API", "Backtesting", "Hyperliquid"],
        image: "/assets/strategyfactory.png",
        link: "https://strategyfactory-last.vercel.app/",
        github: "https://github.com/TradersEntertainment/strategyfactoryLast",
    },
    {
        title: "PolymarketBar",
        description: "Reads Polymarket candle structure to time bets on the book. Live odds, probability curves, orderbook panel, execution path and streak statistics, fed by a FastAPI backend with pluggable CCXT and Hyperliquid data adapters.",
        tags: ["React", "FastAPI", "Python", "WebSockets", "Polymarket"],
        image: "/assets/polymarket-bar.png",
        link: "https://polymarketbar-production.up.railway.app/",
        github: "https://github.com/TradersEntertainment/polymarketbar",
    },
    {
        title: "Hyperliquid Wallet Tracker",
        description: "Pick the wallets you care about and follow their Hyperliquid activity in real time - positions, PnL and trade history on the web, pushed to Telegram as they change. TypeScript bot and Next.js frontend sharing one wallet registry.",
        tags: ["TypeScript", "Next.js", "Telegram Bot", "Hyperliquid"],
        image: "/assets/hyperliquid-bot.png",
        link: "https://choosewalletstotrack.up.railway.app/",
        github: "https://github.com/TradersEntertainment/wallettrackerwebsiteTG",
    },
    {
        title: "Liquidation Hunter",
        description: "Tracks $2M+ Hyperliquid positions and filters the ones sitting within 10% of their liquidation price, tiered critical and warning. Live prices over WebSocket, automatic whale-address discovery from large fills, and Telegram plus X alerts.",
        tags: ["JavaScript", "WebSockets", "Postgres", "Hyperliquid"],
        image: "/assets/polymarket-analyzer.png",
        link: "https://x.com/HyperliquidBot7",
        github: "https://github.com/TradersEntertainment/hl-liq-tracker",
    },
];

const otherProjects: Project[] = [
    {
        title: "Candle Bar Wars",
        description: "Parimutuel prediction market on Base where you bet on candle momentum instead of price: will a 24-hour window hold more green or red 1-minute candles? Pool-based rather than orderbook, so every bet is instantly matched and the underdog wins big. ERC-721 ticket NFTs, bot-driven settlement at 00:00 UTC.",
        tags: ["Solidity", "Base", "Next.js", "Wagmi", "Prediction Markets"],
        image: "/assets/bar-wars.png",
        link: "https://candlewars.up.railway.app",
        github: "https://github.com/TradersEntertainment/CandleBarWars",
    },
    {
        title: "ReadEasy",
        description: "Reads long text, PDFs and Word files the way music apps show lyrics - the active line sits large and bright in the middle while the rest fades away. OCR from photos runs fully on-device via Tesseract WASM, with natural-voice TTS that falls back to the device voice offline. Shipped to iOS through Capacitor.",
        tags: ["TypeScript", "React", "OCR", "TTS", "Capacitor/iOS"],
        link: "https://readeasy.up.railway.app",
        github: "https://github.com/TradersEntertainment/readeasy",
    },
    {
        title: "Trader Battle",
        description: "Gamified investment simulator where you compete against legendary traders like Warren Buffett in historical market scenarios. Features AI portraits and real-time PnL tracking.",
        tags: ["Next.js", "Gamification", "TypeScript", "Tailwind"],
        image: "/assets/trader-battle.png",
        link: "https://tradersdecision.vercel.app/",
        github: "https://github.com/TradersEntertainment/tradersdecision",
    },
    {
        title: "CozyTally",
        description: "A shared counting board for two. Open a room, send the code, and you both watch the same board live - tally cards, day streaks, a synced stopwatch, countdowns with confetti, sticky notes and a joint piggy bank whose tiered goals fill waterfall-style, each goal taking its share before the next one sees a lira.",
        tags: ["Node.js", "WebSockets", "Web Push", "SQLite", "Capacitor"],
        image: "/assets/cozy-tally.png",
        link: "https://cetele.up.railway.app",
        github: "https://github.com/TradersEntertainment/cozytally",
    },
];

/** Deterministic hue per title, so a generated cover never shifts between renders. */
function hueFor(title: string) {
    let h = 0;
    for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) % 360;
    return h;
}

function initialsFor(title: string) {
    const words = title.replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter(Boolean);
    if (words.length === 0) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return words.slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function ProjectCover({ project }: { project: Project }) {
    if (project.image) {
        return (
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        );
    }

    const hue = hueFor(project.title);
    return (
        <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{
                backgroundImage: [
                    `radial-gradient(120% 120% at 15% 0%, hsl(${hue} 68% 22%) 0%, transparent 60%)`,
                    `radial-gradient(120% 120% at 100% 100%, hsl(${(hue + 55) % 360} 68% 18%) 0%, transparent 55%)`,
                    "linear-gradient(180deg, #0b0b0f 0%, #05050a 100%)",
                ].join(","),
            }}
        >
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: [
                        "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px)",
                        "linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
                    ].join(","),
                    backgroundSize: "28px 28px",
                    maskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
                }}
            />
            <span className="relative font-mono text-5xl font-bold tracking-tight text-white/85">
                {initialsFor(project.title)}
            </span>
            <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {project.tags[0]}
            </span>
        </div>
    );
}

function ProjectCard({ project, index, delayOffset = 0 }: { project: Project; index: number; delayOffset?: number }) {
    return (
        <div
            className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards] group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            style={{ animationDelay: `${Math.min(index + delayOffset, 12) * 80}ms` }}
        >
            <div className="aspect-video relative overflow-hidden">
                <ProjectCover project={project} />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity opacity-100 md:opacity-0 md:group-hover:opacity-100">
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
                <p className="text-neutral-400 text-sm mb-4 line-clamp-4">
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
    );
}

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-black/50 relative">
            <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8 xl:gap-0 relative">
                    {/* Section 1: Games & Apps */}
                    <div className="xl:pr-12">
                        <div className="mb-8 text-center xl:text-left animate-fade-in-up">
                            <h2 className="text-3xl font-bold mb-4">Games & Apps</h2>
                            <p className="text-neutral-400">
                                Interactive experiences, Web3 applications, and utilities.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {otherProjects.map((project, index) => (
                                <ProjectCard key={project.title} project={project} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Matrix Divider (Desktop Only) */}
                    <div className="hidden xl:flex justify-center relative h-full">
                        <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-green-500/50 to-transparent shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                    </div>

                    {/* Section 2: Trading Products */}
                    <div className="xl:pl-12">
                        <div className="mb-8 text-center xl:text-left animate-fade-in-up">
                            <h2 className="text-3xl font-bold mb-4 text-red-500">Trading Products</h2>
                            <p className="text-neutral-400">
                                Market intelligence, execution research, and analytics dashboards.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tradingProjects.map((project, index) => (
                                <ProjectCard key={project.title} project={project} index={index} delayOffset={3} />
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-16 text-center text-sm text-neutral-500">
                    Selected work.{" "}
                    <Link
                        href="https://github.com/TradersEntertainment"
                        className="text-neutral-300 underline decoration-white/20 hover:decoration-white/60"
                    >
                        60+ more repositories on GitHub
                    </Link>
                    .
                </p>

            </div>
        </section>
    );
}
