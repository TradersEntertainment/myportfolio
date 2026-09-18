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
        title: "HL Insider Radar",
        description: "Catches suspicious whale positioning on Hyperliquid HIP-3 equity perps in the hour before earnings. Tracks the earnings calendar across four cross-checked sources, listens to the trade feed 24/7, remembers who called each print right, and scores wallets on timing, funding freshness, size/OI and leverage. Ships with a liquidation radar and orderbook wall/spoof detection.",
        tags: ["Python", "FastAPI", "Hyperliquid", "Telegram", "SQLite"],
        github: "https://github.com/TradersEntertainment/hlearninginsiders",
    },
    {
        title: "MSTR Filings Monitor",
        description: "Sub-second SEC EDGAR watcher for Strategy Inc. (MicroStrategy) 8-K filings. Polls every 0.25s inside the ET publication window, extracts Bitcoin purchases, ATM equity sales, converts and preferred issuance with an LLM, and falls back to a deterministic parser when the API is down. Reconciles against XBRL cash figures.",
        tags: ["Python", "SEC EDGAR", "LLM", "Telegram", "Flask"],
        github: "https://github.com/TradersEntertainment/mstrbought",
    },
    {
        title: "StrategyFactory AI",
        description: "Quantitative trading platform that turns plain-English strategy descriptions into executable logic, backtests them candle-by-candle, paper-trades the result and deploys to Hyperliquid through API agents. Drawdown analysis and stop-loss enforcement built in.",
        tags: ["React", "TypeScript", "Gemini API", "Backtesting", "Hyperliquid"],
        image: "/assets/strategyfactory.png",
        link: "https://strategyfactory-last.vercel.app/",
        github: "https://github.com/TradersEntertainment/strategyfactoryLast",
    },
    {
        title: "Trade Replay",
        description: "Replays any trader's position from open to close as an animated time-lapse chart. Reconstructs position episodes from raw fills across Hyperliquid, Polymarket Perps, Binance klines and CSV imports; interactive player plus client-side GIF export. TypeScript monorepo with 165 tests.",
        tags: ["TypeScript", "Next.js", "Monorepo", "Market Data", "Canvas"],
        github: "https://github.com/TradersEntertainment/positionreplay",
    },
    {
        title: "Who Carries the Nasdaq?",
        description: "Attribution dashboard for a cap-weighted index. Answers who actually produced today's NASDAQ-100 move: per-stock contribution in index points, weighted vs equal-weighted divergence, concentration bands, a weight treemap and a 'remove the top N carriers' counterfactual. Live-streamed over SSE.",
        tags: ["Node.js", "SSE", "Market Data", "Dataviz", "Equities"],
        github: "https://github.com/TradersEntertainment/nasdaqwhatsup",
    },
    {
        title: "Breakout Prop Tracker",
        description: "Four services in one deployment: a funding-rate alarm that fires when Binance perp funding crosses 0.7% in absolute terms and prints the Hyperliquid hourly rate beside it for the arbitrage leg, a range-finder for mean-reverting coins, a live sparkline dashboard, and a paper-trading simulator that logs every fill for analysis.",
        tags: ["Python", "Funding Arbitrage", "Binance", "Hyperliquid", "Telegram"],
        github: "https://github.com/TradersEntertainment/breakoutpropcoinstracker",
    },
    {
        title: "InsiderScope",
        description: "Solana memecoin insider tracker. Mines historical on-chain data for the real early buyers of tokens that reached $10M+ market cap (filtering out sniper bots), watches those wallets live via Helius webhooks, alerts on Telegram within seconds, and auto-follows wallet rotations when SOL moves to a fresh address.",
        tags: ["TypeScript", "Solana", "Postgres", "BullMQ", "Next.js"],
        github: "https://github.com/TradersEntertainment/memes",
    },
    {
        title: "HYPTAKIP",
        description: "Hyperliquid whale monitor with a per-wallet configurable alert threshold. Reports new position opens, size changes above 10%, full closes with realized PnL and liquidation-proximity warnings, backed by a dashboard showing entry vs mark, ROE and distance to liquidation.",
        tags: ["JavaScript", "Hyperliquid", "SQLite", "Telegram", "Express"],
        github: "https://github.com/TradersEntertainment/hyptakip",
    },
    {
        title: "Liquidation Hunter",
        description: "Tracks $2M+ Hyperliquid positions and filters the ones sitting within 10% of their liquidation price, tiered critical and warning. Live prices over WebSocket, automatic whale-address discovery from large fills, and Telegram plus X alerts.",
        tags: ["JavaScript", "WebSockets", "Postgres", "Hyperliquid"],
        image: "/assets/polymarket-analyzer.png",
        link: "https://x.com/HyperliquidBot7",
        github: "https://github.com/TradersEntertainment/hl-liq-tracker",
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
        title: "PolyRelayTracker",
        description: "Follows Polymarket whale withdrawals across chains. Resolves a profile link, handle or tx hash into a four-stop visual trace: Polygon proxy wallet, Relay Protocol bridge deposit, destination chain wallet, and finally the exchange it lands on.",
        tags: ["React", "Web3", "Polygon", "Cross-chain", "Vite"],
        github: "https://github.com/TradersEntertainment/polyrelaytracker",
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
        title: "PolyBetPriceTracker",
        description: "Orderbook microstructure alerts for Polymarket. Paste any market link and it resolves title, price and token IDs through the Gamma API, renders the live CLOB book as depth bars, then alerts on sudden large walls near the spread and on depth surges, routed per alert to different Telegram chats.",
        tags: ["Node.js", "Polymarket", "Orderbook", "Telegram", "SQLite"],
        github: "https://github.com/TradersEntertainment/polybetpricetracker",
    },
    {
        title: "5mFinder",
        description: "Polymarket event analyzer and position tracker that reads Polygon logs directly over web3 across a pool of fallback RPCs, scanning whale positions in the background with a blacklist workflow for addresses you want ignored.",
        tags: ["Python", "web3.py", "Polygon", "Flask", "Polymarket"],
        github: "https://github.com/TradersEntertainment/5mfinder",
    },
    {
        title: "S&P 500 Resolution Hub",
        description: "Settlement-grade reference for S&P 500 Polymarket markets. Pulls live SPY prices from Pyth Hermes and the exact 16:00 New York prior close from Pyth Benchmarks, handling weekends and pre-close hours so the resolution number is never ambiguous.",
        tags: ["Python", "Pyth Network", "Flask", "Equities"],
        github: "https://github.com/TradersEntertainment/sp500wsj",
    },
    {
        title: "Preferred & CEF Scanner",
        description: "Scans preferred-share and closed-end-fund master lists on a 15-minute loop for discount and yield thresholds, with a web dashboard and Telegram push on the names that clear the filter.",
        tags: ["Python", "Flask", "Screening", "Fixed Income"],
        github: "https://github.com/TradersEntertainment/preffilter",
    },
];

const otherProjects: Project[] = [
    {
        title: "Kadastro",
        description: "You draw roads on a map with your finger and the city grows around them. A state-built national highway crosses the map that you can neither place nor demolish - the whole game is what your city extracts from it. Deterministic seeded simulation with zero asset files: every texture, building facades included, is generated in code at startup.",
        tags: ["TypeScript", "three.js", "Simulation", "WebGL", "PWA"],
        github: "https://github.com/TradersEntertainment/citybuild",
    },
    {
        title: "flight",
        description: "Open-world browser game on the real map. Fly a plane, drive a car or sail a boat over genuine elevation data and satellite imagery, teleport anywhere, switch to night, race through gates. Terrain streams as a Web Mercator quadtree with skirt geometry at LOD seams; buildings and roads come from OpenStreetMap.",
        tags: ["TypeScript", "three.js", "Geospatial", "OSM", "Game Dev"],
        github: "https://github.com/TradersEntertainment/flight",
    },
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
        title: "Istanbul: Bogaz",
        description: "Post-apocalyptic survival FPS set on the real geography of the Bosphorus - gather, craft, build, survive. Unreal Engine 5 with Nanite, Lumen and virtual shadow maps; real-world terrain from Cesium and OpenStreetMap, with a Python pipeline importing OSM buildings into the engine.",
        tags: ["C++", "Unreal Engine 5", "Cesium", "OSM", "Game Dev"],
        github: "https://github.com/TradersEntertainment/istanbul",
    },
    {
        title: "Tactical Fronts 3D",
        description: "Fully 3D tactical card war fought on three simultaneous fronts - land, air and sea - with country cards, leaders and tactic cards. Cinematic slow-motion and kill-cam layered on top of a hitstop system that never touches determinism, plus online rooms, leaderboards and a campaign.",
        tags: ["JavaScript", "three.js", "Multiplayer", "Cloudflare Workers"],
        github: "https://github.com/TradersEntertainment/gfbgamrealyedek",
    },
    {
        title: "Diyetisyen AI",
        description: "AI nutrition coach on Telegram built on one rule: protein is fixed, the diet is flexible. Computes a protein floor from body composition that no plan may undercut, then lets the model pick and justify the strategy - balanced, low-carb, Mediterranean - adapting weekly from real weigh-ins. 50-question onboarding, natural-language food logging, permanent memory.",
        tags: ["Python", "FastAPI", "Claude API", "Postgres", "Telegram"],
        github: "https://github.com/TradersEntertainment/diyetisyenapp",
    },
    {
        title: "Minesweeper Battle",
        description: "Multiplayer on-chain minesweeper on Base. 2-10 players take turns avoiding mines for an ETH pot, with grid size and mine count scaling to the player count and difficulty rising 20% each round. Game logic lives entirely in the contract; the UI updates from events.",
        tags: ["Solidity", "Hardhat", "Next.js", "Wagmi", "Base"],
        github: "https://github.com/TradersEntertainment/basebuilding",
    },
    {
        title: "Base Roulette Casino",
        description: "Token-based roulette on Base: swap ETH for game tokens, bet black or red at 1.98x, and track platform-wide statistics. Three contracts - a burnable ERC-20, the roulette game, and a fee collector running automated buybacks.",
        tags: ["Solidity", "ERC-20", "Next.js", "RainbowKit", "Base"],
        github: "https://github.com/TradersEntertainment/TradersEntertainment.github.io",
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
    {
        title: "BountyFeedHQ",
        description: "Autonomous X/Twitter account that scrapes Pump.fun GO bounties with Playwright, scores them for viral potential, writes tweets in degen-culture voice through an LLM and posts them on a cron, with a content safety filter in front of the API.",
        tags: ["Node.js", "Playwright", "LLM", "X API", "SQLite"],
        github: "https://github.com/TradersEntertainment/bounty",
    },
    {
        title: "ButceSef",
        description: "Kitchen assistant that scrapes daily grocery prices with Selenium and turns them into meal plans you can actually afford, so the menu follows the market rather than a fixed recipe list.",
        tags: ["Python", "Selenium", "Scraping", "JavaScript"],
        github: "https://github.com/TradersEntertainment/butcesef",
    },
    {
        title: "Museum Heist",
        description: "Real-time multiplayer heist game over Socket.IO, paired with an admin panel for a student art exhibition - JWT auth, upload handling, rate limiting and geo-tagged visitor stats.",
        tags: ["JavaScript", "Socket.IO", "Express", "JWT"],
        github: "https://github.com/TradersEntertainment/artstealgame",
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
