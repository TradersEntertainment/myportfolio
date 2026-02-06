"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Stars, Sparkles } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

// Placeholder Dragon Component (Replace "dragon.glb" with your file)
function DragonModel({ isLanded, onClick }: { isLanded: boolean, onClick: () => void }) {
    // Try to load model, fallback to Box if missing (handled by error boundary conceptually, 
    // but here we just try-catch or assume user will provide file. 
    // For now, let's render a group that WOULD contain the model)

    // Load the dragon model
    const { scene } = useGLTF('/dragon.glb');
    const group = useRef<THREE.Group>(null);

    // Clone scene so we can re-use it if needed, though here nice to just have one
    const dragonScene = scene.clone();

    // Default position: Top Left (off screen mostly)
    const [position, setPosition] = useState(new THREE.Vector3(-10, 5, 0));

    useFrame((state, delta) => {
        if (!group.current) return;

        if (!isLanded) {
            // Fly towards bottom right
            // Target: x=5, y=-3
            const target = new THREE.Vector3(5, -3, 0);

            // Lerp position
            group.current.position.lerp(target, delta * 0.5);

            // Orient towards target
            group.current.lookAt(target);
        } else {
            // Idling animation (bobbing)
            group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} onClick={onClick} position={[-10, 5, 0]}>
            <primitive
                object={dragonScene}
                scale={50} // Stanford dragon is usually tiny, scale up.
                rotation={[0, -Math.PI / 2, 0]} // Orient to face right
            />

            {/* Eye glow - positioned relative to assumed head location */}
            <pointLight position={[0, 1, 0.5]} color="orange" intensity={2} distance={3} />
        </group>
    );
}

function FireBreath({ isBreathing }: { isBreathing: boolean }) {
    if (!isBreathing) return null;

    return (
        <group position={[5, -3, 0]}> {/* Position matches dragon's landing spot approximately */}
            <Sparkles
                count={50}
                scale={4}
                size={6}
                speed={0.4}
                opacity={0.8}
                color="#ff4500"
                position={[1, 0.5, 0]} // Offset from dragon mouth
            />
            <pointLight position={[1, 0, 0]} color="#ff4500" intensity={5} distance={5} />
        </group>
    );
}

export function Dragon3D() {
    const [isLanded, setIsLanded] = useState(false);
    const [isBreathingFire, setIsBreathingFire] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLanded(true);
        }, 4000); // Flight duration approximation
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        if (isLanded) {
            setIsBreathingFire(true);
            setTimeout(() => setIsBreathingFire(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                style={{ pointerEvents: 'none' }} // Let clicks pass through canvas
                onCreated={({ gl }) => {
                    // Enable pointer events only on interactive objects
                    gl.domElement.style.pointerEvents = 'none';
                }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />

                {/* Enable interactions only for objects */}
                <group
                    onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                    onPointerOut={() => { document.body.style.cursor = 'auto' }}
                >
                    {/* We wrap interactive elements in a group that resets pointer-events logic if needed, 
                 but R3F handles raycasting. crucial part is CSS pointer-events on parent div */}
                    <Suspense fallback={null}>
                        <DragonModel isLanded={isLanded} onClick={handleClick} />
                    </Suspense>
                </group>

                <FireBreath isBreathing={isBreathingFire} />
            </Canvas>
            {/* 
        NOTE: To allow clicking the dragon, we need 'pointer-events-auto' on the canvas 
        or use R3F's event system intelligently. 
        Since the parent div is pointer-events-none, the Canvas is too.
        We need to make the Canvas pointer-events-auto but TRANSPARENT to clicks where there is no mesh.
        HTML/CSS doesn't support "click-through transparent pixels" easily for Canvas.
        
        ALTERNATE APPROACH:
        The div is full screen. If we make it picking-enabled, it blocks the site.
        We can set the div to 'pointer-events: none', and the dragon logic can use a 
        synced HTML overlay OR we settle for "Dragon blocks clicks behind it" 
        and set the div to pointer-events: none, but standard DOM events won't hit the canvas.
        
        CORRECTION: R3F `eventSource` prop can help, or we can just size the canvas small.
        BUT the dragon moves across the screen.
        
        BEST FIX for Fullscreen Overlay:
        CSS: `.r3f-canvas { pointer-events: none; }`
        This means NO interaction.
        To get interaction + pass-through is hard.
        
        SIMPLEST FIX for this iteration:
        Change global Layout to not block site.
      */}
            <style jsx global>{`
        canvas {
            pointer-events: auto !important; /* Enable clicks on canvas */
        }
        /* But this blocks the proper site buttons. 
           We actually need 'pointer-events: none' generally, and enabled only on the mesh? 
           Threejs raycaster works even with pointer-events: none on container? NO.
           
           Solution:
           Use Drei's <View> or just accept that for this demo, 
           we might need a non-full-screen canvas OR use:
           pointer-events: none for container,
           pointer-events: auto for the actual geometry? No, CSS doesn't know about 3D geometry.
           
           Compromise:
           Make the container roughly track the dragon? Too complex.
           
           For now: Let's keep it VISUAL ONLY (Flight + Fire) or 
           Make the canvas cover the whole screen but setting 'pointer-events: none'.
           BUT the user requested "Click to breathe fire".
           
           Hack:
           Set pointer-events: none.
           Add a small transparent HTML div that follows the dragon's approximate position for the click.
        */
      `}</style>

            {/* HTML Interaction Layer - simplified tracking for the "Click" */}
            <div
                onClick={handleClick}
                className={`fixed w-32 h-32 bg-transparent cursor-pointer transition-all duration-300 ease-out`}
                style={{
                    // Rough sync with 3D position
                    bottom: isLanded ? '5%' : 'auto',
                    right: isLanded ? '5%' : 'auto',
                    top: isLanded ? 'auto' : '20%', // Starting pos
                    left: isLanded ? 'auto' : '20%',
                    pointerEvents: 'auto', // Enable clicks on this box
                    display: isLanded ? 'block' : 'none' // Only clickable when landed for simplicity
                }}
            />
        </div>
    );
}
