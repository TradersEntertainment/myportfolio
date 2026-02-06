"use client";

import { useEffect, useRef, useState } from 'react';

export function MatrixIntro() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

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

        const draw = () => {
            // Fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
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
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        // Fade out logic is now controlled by the BattleScene ideally, 
        // but for standalone safety we keep a long timer or listen to an event.
        // For now, let's make it persist longer so the 3D battle can play out (approx 5-6s)
        setTimeout(() => { setFadeOut(true); }, 5500);
        setTimeout(() => { setShow(false); }, 6500);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[40] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out pointer-events-none ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
