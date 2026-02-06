"use client";

import { useEffect, useRef, useState } from 'react';

export function MatrixIntro() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [initText, setInitText] = useState("");

    useEffect(() => {
        // Check if we should show the intro (optional: only show once per session)
        // const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
        // if (hasSeenIntro) { setShow(false); return; }
        // sessionStorage.setItem('hasSeenIntro', 'true');

        // Canvas Matrix Rain Logic
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
        const fontSize = 16;
        const columns = width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // Resize handler
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        // Timeline for Intro
        // 1. Start: Rain
        // 2. 0.5s: "SYSTEM INITIALIZED" text
        setTimeout(() => setInitText("SYSTEM INITIALIZED"), 500);

        // 3. 1.5s: "ACCESS GRANTED" loop or similar
        setTimeout(() => setInitText("ACCESS GRANTED"), 1800);

        // 4. 2.5s: Fade out
        setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        // 5. 3.5s: Remove from DOM
        setTimeout(() => {
            setShow(false);
        }, 3500);

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
            <h1 className="relative z-10 font-mono text-4xl md:text-6xl text-green-500 font-bold tracking-widest animate-pulse">
                {initText}
            </h1>

            <style jsx>{`
        /* Optional custom glitch animations could go here */
      `}</style>
        </div>
    );
}
