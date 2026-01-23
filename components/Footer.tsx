import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer id="contact" className="py-12 border-t border-white/10 bg-black">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-6">Let's Build Something Together</h3>
                <p className="text-neutral-400 max-w-lg mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>

                <div className="flex items-center gap-6 mb-8">
                    <Link href="mailto:omeryilmaz1329@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Mail size={24} />
                    </Link>
                    <Link href="https://github.com/TradersEntertainment/myportfolio.git" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Github size={24} />
                    </Link>
                    <Link href="https://x.com/HyperliquidBot7" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Twitter size={24} />
                    </Link>
                </div>

                <p className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} Omer. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
