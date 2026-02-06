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

        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
        const fontSize = 16;
        const columns = width / fontSize;
        const drops: number[] = [];

        // Initialize drops at random y positions for immediate screen coverage or 0 for top-down
        // Top-down looks better for an "incoming" effect
        for (let i = 0; i < columns; i++) drops[i] = Math.random() * -20; // Start slightly above

        const draw = () => {
            // Clear canvas completely to maintain transparency
            ctx.clearRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`; // Consolas, Monaco, etc

            for (let i = 0; i < drops.length; i++) {
                // Draw the main character and a simulated trail
                // Since we clearRect, we must draw the "tail" manually

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Draw Tip (Brightest)
                ctx.fillStyle = '#ccffcc';
                const textObj = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(textObj, x, y);

                // Draw Trail (Fading)
                const trailLength = 10;
                for (let k = 1; k < trailLength; k++) {
                    ctx.fillStyle = `rgba(0, 255, 0, ${1 - k / trailLength})`;
                    // We can use the same char or random, random looks more 'active'
                    const trailChar = characters.charAt(Math.floor(Math.random() * characters.length));
                    ctx.fillText(trailChar, x, y - k * fontSize);
                }

                // Move drop
                drops[i]++;

                // Reset
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        // Timing requested: "sadece ilk girişte 2 saniye"
        setTimeout(() => { setFadeOut(true); }, 2000);
        setTimeout(() => { setShow(false); }, 3000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!show) return null;

    return (
        <div
            // Removed bg-black. pointer-events-none ensures clicks go through to the site.
            // z-50 to stay on top
            className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ease-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
