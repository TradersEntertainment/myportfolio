"use client";

import { useEffect, useRef, useState } from 'react';

export function MatrixIntro() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [initText, setInitText] = useState("");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // --- MATRIX RAIN SETUP ---
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
        const fontSize = 16;
        const columns = width / fontSize;
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) drops[i] = 1;

        // --- CHAOS ENGINE SETUP ---
        const chaosEmojis = [
            '👾', '🏃', '🏎️', '✈️', '👻', '🍄', '🐢', '🕹️', '🎲', '🏰', '🗡️', // Gaming
            '🚀', '📉', '📈', '💰', '🐂', '🐻', '💎', '🏦', '💸', '📊', // Trading
            '🔥', '💥', '⚡', '🌪️', '🌀', '⚠️', '☢️', '💣', '🩸', '💊'  // Pure Chaos
        ];

        interface Particle {
            x: number;
            y: number;
            emoji: string;
            speedX: number;
            speedY: number;
            rotation: number;
            rotationSpeed: number;
            size: number;
        }

        const particles: Particle[] = [];
        const MAX_PARTICLES = 80; // "Daha da kaos"

        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                emoji: chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)],
                speedX: (Math.random() - 0.5) * 20, // High Speed
                speedY: (Math.random() - 0.5) * 20,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.8,
                size: 20 + Math.random() * 50
            });
        }

        const draw = () => {
            // 1. Matix Rain Background (fades previous frame)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly faster fade for chaos clarity
            ctx.fillRect(0, 0, width, height);

            // Draw Matrix Rain
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }

            // 2. Render Chaos Particles
            for (let p of particles) {
                // Update
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                // Screen Wrap (Teleporting enemies)
                if (p.x < -100) p.x = width + 100;
                if (p.x > width + 100) p.x = -100;
                if (p.y < -100) p.y = height + 100;
                if (p.y > height + 100) p.y = -100;

                // Random Glitch Jitter
                if (Math.random() > 0.92) {
                    p.x += (Math.random() - 0.5) * 100;
                    p.y += (Math.random() - 0.5) * 100;
                }

                // Render
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.emoji, 0, 0);
                ctx.restore();
            }
        };

        const interval = setInterval(draw, 33);

        // Resize handler
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        // Timeline
        setTimeout(() => setInitText("SYSTEM BREACH DETECTED"), 500);
        setTimeout(() => setInitText("CHAOS PROTOCOL: ENGAGED"), 1800);

        setTimeout(() => { setFadeOut(true); }, 3500); // Longer intro for chaos
        setTimeout(() => { setShow(false); }, 4500);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Glitchy Text Overlay */}
            <h1 className="relative z-10 font-mono text-3xl md:text-6xl text-red-500 font-bold tracking-widest animate-pulse text-center p-4 bg-black/50 border-2 border-red-500 rounded">
                {initText}
            </h1>
        </div>
    );
}
