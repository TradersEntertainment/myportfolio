"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';

// Helper for simple plane geometry (group of meshes)
function Plane({ position }: { position: THREE.Vector3 }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!group.current) return;
        // Move Plane Right
        group.current.position.x += 12 * delta;
        // Bank slightly
        group.current.rotation.z = -0.2;
    });

    return (
        <group ref={group} position={position}>
            {/* Fuselage */}
            <mesh rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.5, 1, 8]} />
                <meshStandardMaterial color="#888" />
            </mesh>
            {/* Wings */}
            <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.2, 5]} />
                <meshStandardMaterial color="#666" />
            </mesh>
            {/* Tail */}
            <mesh position={[-3.5, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 3]} />
                <meshStandardMaterial color="#777" />
            </mesh>
        </group>
    );
}

// Missile (Seeker)
function Missile({ target, onHit }: { target: THREE.Vector3, onHit: () => void }) {
    const ref = useRef<THREE.Group>(null);
    const speed = 25;

    useFrame((state, delta) => {
        if (!ref.current) return;

        const pos = ref.current.position;
        const dir = new THREE.Vector3().copy(target).sub(pos).normalize();

        // Simple homing
        pos.add(dir.multiplyScalar(speed * delta));
        ref.current.lookAt(target);

        // Hit detection
        if (pos.distanceTo(target) < 1) {
            onHit();
        }
    });

    return (
        <group ref={ref} position={[0, -5, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 2]} />
                <meshStandardMaterial color="white" emissive="orange" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0, 1]}>
                <coneGeometry args={[0.2, 0.5, 8]} />
                <meshStandardMaterial color="red" />
            </mesh>
            {/* Trail */}
            <Sparkles count={20} scale={2} color="orange" size={2} noise={1} opacity={0.5} position={[0, 0, -2]} />
        </group>
    );
}

// Launcher Turret
function Launcher() {
    return (
        <group position={[0, -7, 0]}>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.5, 0.8, 3]} />
                <meshStandardMaterial color="#555" />
            </mesh>
        </group>
    );
}

function Explosion({ position }: { position: THREE.Vector3 }) {
    return (
        <group position={position}>
            <Sparkles count={100} scale={15} size={20} speed={2} opacity={1} color="#ffaa00" />
            <pointLight intensity={10} distance={20} color="orange" />
        </group>
    )
}

function SceneContent() {
    // Game State
    const [hit, setHit] = useState(false);

    // Virtual Objects State
    // We cheat a bit: We know the plane starts at X=-20 and moves X+12/sec.
    // We launch missile at T=0.5s.
    // Intersection will happen around T=1.5s approx.
    const planeStart = new THREE.Vector3(-30, 4, 0);
    const [planePos, setPlanePos] = useState(planeStart.clone());
    const [missileLaunched, setMissileLaunched] = useState(false);

    useFrame((state, delta) => {
        if (hit) return; // Freeze scene on hit or keep updating logic

        // Update Plane Tracker for Missile
        // (Visual plane updates itself in its own component, this is game logic ref)
        setPlanePos(prev => new THREE.Vector3(prev.x + 12 * delta, 4, 0));

        // Launch Trigger
        if (state.clock.elapsedTime > 1.0 && !missileLaunched) {
            setMissileLaunched(true);
        }
    });

    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} />

            {!hit && <Plane position={planePos} />}
            <Launcher />
            {missileLaunched && !hit && (
                <Missile
                    target={planePos}
                    onHit={() => {
                        setHit(true);
                    }}
                />
            )}

            {hit && <Explosion position={planePos} />}
        </>
    );
}

export function BattleScene() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Hide entire canvas after sequence ends
        setTimeout(() => setVisible(false), 6500);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[50] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <SceneContent />
            </Canvas>
        </div>
    );
}
