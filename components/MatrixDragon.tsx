"use client";

import { useEffect, useRef, useState } from 'react';

// Simple Dragon Silhouette SVG Path
const DRAGON_PATH = "M95.6,47.3c-2.8-1.6-9.1-4.7-12.2-6.1c-3.1-1.3-4.1-1.3-4.1-1.3s1.9,4.4,2.5,6.6c0.6,2.2,0.9,5.3,0,7.5c-0.9,2.2-2.8,4.1-5,5.3c-2.2,1.3-5.3,1.9-8.4,0.9c-3.1-0.9-5-3.4-5.9-5.9c-0.9-2.5-0.6-5.3,0.9-7.5c1.6-2.2,4.1-3.4,6.9-3.4c2.8,0,5.6,1.3,7.5,3.4l0.9,1.3l-1.3-1.6c-1.6-1.9-4.1-3.1-6.9-3.1c-2.8,0-5.3,1.3-6.9,3.4c-1.6,2.2-1.9,5-0.9,7.5c0.9,2.5,2.8,5,5.9,5.9c3.1,0.9,6.3,0.3,8.4-0.9c2.2-1.3,4.1-3.1,5-5.3c0.9-2.2,0.6-5.3,0-7.5c-0.6-2.2-2.5-6.6-2.5-6.6s1.3,0,4.1,1.3c3.1,1.3,9.4,4.4,12.2,6.1c2.8,1.6,4.4,4.1,4.4,4.1S98.4,48.9,95.6,47.3z M28.4,72.6c0,0-10.9-8.4-18.4-12.8c-7.5-4.4-10-8.8-10-8.8s3.4,2.5,10,5.9c6.6,3.4,16.6,10.6,18.4,12.2C30.3,70.6,30.3,72.6,28.4,72.6z M50,50c0,0,20-20,30-25s15-5,15-5s-5,5-10,10S60,45,50,50z";
// Using a more complex base64 SVG for mask for better visual
const DRAGON_SVG_BASE64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTE1LjQgNTUuNWMtNi4zIDE1LjktMTEuNyA0MS4xLS40IDU4LjYgMy44IDUuOCAxMi45IDguNyAxMy4yIDE1LjUuMyA1LjYtNi42IDguNy0xMS44IDkuNS0xMC45IDEuNy0yMy4xLTUuNi0yNi41LTE2LjEtMS44LTUuNC0uMS0xMS42IDUuMi0xNC44IDExLjEtNi42IDI2LjMtMTUuNyA5LjEtMzMuMy01LjgtNS45LTE2LjQtOC44LTIwLjYtMy44LTcuNyA5LjItLjggMjguMyAzLjcuanptNTkuNyAzNS42Yy01LjUgMTEuMS0xNi4xIDI1LjMtMjkuMSAyNi45LTkgMS4xLTE3LjItNS4xLTE5LjEtMTMuOS0yLTkuMiAzLjItMTguMyAxMS42LTIyIDguMS0zLjUgMTguNC0uOCAyMy40IDYuNiAzLjUgNS4xIDEuNyAxMS43LTEuNyAxMi0yIC4yLTQuNS0zLjUtNS41LTUuNC0zLjYtNi44IDYuNi04LjYgMTItLjUgMy4zIDUuMSA1LjUgOS43IDguNCAxNS44LTcuNS0zLjYtNS44LTExLjMtLjEtMTkuNU0zMzcuMyA5MS4yYzEyLjggMTAuMiAxOC43IDMzIDcuMSA1My4xLTMuOSA2LjctMTQuMiAxMC0xMi45IDE2LjggMS4xIDUuNSA4LjIgOC4zIDEzLjUgOC43IDExLjEgMSAyMy02LjkgMjUuNS0xNy43IDEuMy01LjUtMS4xLTExLjYtNi43LTE0LjItMTEuOC01LjMtMjcuNi0xMy4zLTExLjctMzIuNSA1LjQtNi41IDE2LjItMTAuMSAyMC45LTUuMyA4LjYgOC44IDEuMSAyOC4yLTQuMS4xeiIvPjwvc3ZnPg==`;

// A detailed dragon silhouette from fontawesome (dragon-solid)
// Re-encoded as a mask-friendly SVG
const DRAGON_MASK_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M166.4 75.5c23.6-7.1 48.4 6 55.5 29.6c4 13.3 1.1 27.2-6.6 37.9c13.1-2.9 26.6-4.6 39.9-5.6c-8.9-19-21.2-36.8-37.4-51.6C197.3 67 178.6 57.5 159.2 56.6c-4.1-.2-8.3 .5-12.4 2.1c-17.6 6.9-26.6 26.9-19.6 44.5l14.8 37.1c6 15 22.9 22.4 37.9 16.4l24-9.6c2.5-.9 4.9-2.2 7-3.9c-23.6-7-39.7-27.4-44.5-51.5zm196.1 4.1c11.9-5 24.2-8.8 36.9-11.2c-5.8-19.8-17.6-38.3-35.9-52.9c-7.2-5.7-15.3-10.3-24.1-13.4c-4.4-1.5-9-2.3-13.6-2.3c-18.9 0-35.8 12.3-41.2 30.2L273 68.6c-4.9 16.3 3.6 33.6 19.9 38.5l24.9 7.5c2.6 .8 5.4 1.1 8.1 .8c-23.4-6-40.4-26.2-46-50.6c21-12.2 46.9-11.6 67.2 4.9c9.3 7.6 15.6 18.2 16.8 30.1zM58.6 245.8c-7.9-7-15.6-14.2-22.9-21.6c-11.8-11.9-14.4-30.8-5.3-45.3c3.4-5.4 8.1-9.9 13.8-12.9c13.7-7.3 30.6-5.1 42 5.1c3.5 3.1 6.8 6.5 9.7 10.1c16.5-1.9 33.2-1.9 49.8 0c-4.8 8.6-8.9 17.6-12.1 26.9c-24.6 6.3-49.8 18.3-74.9 37.7zM432 448c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V320c0-17.7 14.3-32 32-32 0-35.3 28.7-64 64-64 21.6 0 40.7 10.7 52.4 27.1 21.6-10.7 45.4-17.1 70.8-18.3 11.8-21.8 34.6-36.8 61.2-36.8 36.1 0 65.4 29.3 65.4 65.4c0 10.5-2.5 20.4-6.9 29.2 24.3 8.3 41.7 31.5 41.7 58.4 0 14.6-5.1 28.1-13.7 38.7 8.3 10.6 13.2 24 13.2 38.5c0 35.3-28.7 64-64 64V448zM192 160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c17.7 0 32-14.3 32-32zm192 0c0-17.7-14.3-32-32-32H288c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c17.7 0 32-14.3 32-32z"/></svg>`;


export function MatrixDragon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLanded, setIsLanded] = useState(false);
    const [isBreathingFire, setIsBreathingFire] = useState(false);

    useEffect(() => {
        // Flight animation timer
        const timer = setTimeout(() => {
            setIsLanded(true);
        }, 4000); // Wait for flight to finish (match CSS duration)

        return () => clearTimeout(timer);
    }, []);

    // Matrix Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to match the display size of the dragon
        const width = 300; // Increased size
        const height = 300;
        canvas.width = width;
        canvas.height = height;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 10;
        const columns = width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trailing effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // Green text
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

        const intervalId = setInterval(draw, 33);

        return () => clearInterval(intervalId);
    }, []);

    const handleClick = () => {
        if (isLanded) {
            setIsBreathingFire(true);
            setTimeout(() => setIsBreathingFire(false), 2000); // Fire duration
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`fixed z-50 transition-all duration-[4000ms] ease-in-out cursor-pointer group`}
            style={{
                width: '300px',
                height: '300px',
                // Start position (Top Left off-screen)
                top: isLanded ? 'auto' : '-300px',
                left: isLanded ? 'auto' : '-300px',
                // End position (Bottom Right)
                bottom: isLanded ? '20px' : 'auto',
                right: isLanded ? '20px' : 'auto',
                // Use transform for smoother flight curve ideally, but fixed pos transition works for simple A to B
                transform: isLanded ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(45deg)',
            }}
        >
            {/* Dragon Shape with Matrix Effect */}
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    maskImage: `url('${DRAGON_MASK_URI}')`,
                    WebkitMaskImage: `url('${DRAGON_MASK_URI}')`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                }}
            />

            {/* Fire Effect Overlay */}
            {isBreathingFire && (
                <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none">
                    <div className="fire-breath" />
                </div>
            )}

            <style jsx>{`
        .fire-breath {
            position: absolute;
            top: 40%; 
            right: 60%; /* Position near mouth assuming dragon faces left? Adjust based on SVG */
            width: 20px;
            height: 20px;
            background: transparent;
            box-shadow: 
                -20px 10px 50px 10px rgba(255, 69, 0, 0.8),
                -60px 20px 80px 20px rgba(255, 140, 0, 0.6);
            animation: breathe 0.2s infinite alternate;
            transform-origin: right center;
        }

        /* Create a cone of fire using pseudo-elements or specific styles */
        .fire-breath::before {
            content: '';
            position: absolute;
            right: 0;
            top: -10px;
            width: 150px;
            height: 50px;
            background: linear-gradient(to left, rgba(255,0,0,0), rgba(255,69,0,0.8), rgba(255,255,0,0.8));
            border-radius: 50% 0 0 50%;
            filter: blur(8px);
            transform: rotate(-20deg);
        }

        @keyframes breathe {
            0% { transform: scale(1) rotate(-20deg); opacity: 0.8; }
            100% { transform: scale(1.1) rotate(-20deg); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
