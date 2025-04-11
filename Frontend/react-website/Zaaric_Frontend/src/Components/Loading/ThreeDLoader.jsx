import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const ThreeDLoader = () => {
    const groupRef = useRef();
    const electronRefs = useRef(Array(8).fill(null));
    const nucleusMaterialRef = useRef();
    const electronMaterialRefs = useRef([]);

    // Create electron positions
    const createElectronPositions = () => {
        const positions = [];
        const radius = 2;
        const segments = 8;

        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            positions.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
        }

        return positions;
    };

    const electronPositions = createElectronPositions();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Rotate the entire group
        groupRef.current.rotation.y += delta * 0.5;

        // Rotate electrons around their orbits
        electronRefs.current.forEach((electron, index) => {
            if (electron) {
                const time = state.clock.getElapsedTime();
                const angle = (time + index * 0.5) % (Math.PI * 2);
                const radius = 2;
                electron.position.x = Math.cos(angle) * radius;
                electron.position.z = Math.sin(angle) * radius;
            }
        });

        // Pulsing effect for nucleus
        if (nucleusMaterialRef.current) {
            const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1.8;
            nucleusMaterialRef.current.emissiveIntensity = pulse * 0.5;
        }

        // Pulsing effect for electrons
        electronMaterialRefs.current.forEach((material, index) => {
            if (material) {
                const pulse = Math.sin(state.clock.getElapsedTime() * 3 + index) * 0.2 + 0.8;
                material.emissiveIntensity = pulse * 0.8;
            }
        });
    });

    return (
        <>
           
            
            <pointLight position={[0, 0, 5]} intensity={1} color="#2ec4b6" distance={10} decay={2} />

            <group ref={groupRef}>
                {/* Nucleus with advanced material */}
                <Sphere args={[0.6, 128, 128]}>
                    <meshPhysicalMaterial
                        ref={nucleusMaterialRef}
                        attach="material"
                        color="#ff7f32"
                        roughness={0.1}
                        metalness={0.9}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        transmission={0.2}
                        thickness={0.5}
                        ior={1.5}
                        emissive="#ff7f32"
                        emissiveIntensity={0.5}
                        envMapIntensity={1}
                    />
                </Sphere>

                {/* Electron orbits */}
                {electronPositions.map((pos, index) => (
                    <Sphere
                        key={`electron-${index}`}
                        ref={(el) => {
                            if (el) {
                                electronRefs.current[index] = el;
                            }
                        }}
                        args={[0.25, 64, 64]}
                        position={pos}
                    >
                        <meshPhysicalMaterial
                            ref={(el) => electronMaterialRefs.current[index] = el}
                            color="#2ec4b6"
                            roughness={0.05}
                            metalness={0.8}
                            clearcoat={1}
                            clearcoatRoughness={0.05}
                            emissive="#2ec4b6"
                            emissiveIntensity={0.8}
                            ior={1.8}
                            transmission={0.4}
                            thickness={0.3}
                            envMapIntensity={1.5}
                        />
                    </Sphere>
                ))}

                {/* Glowing orbit rings */}
                {[1, 2, 3].map((radius, index) => (
                    <mesh key={`ring-${index}`} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[radius - 0.1, radius + 0.1, 128]} />
                        <meshStandardMaterial
                            color="#2ec4b6"
                            emissive="#e0fbfc" 
                            emissiveIntensity={0.5}
                            roughness={0.3}
                            metalness={0.7}
                            transparent
                            opacity={0.4}
                            side={THREE.DoubleSide}
                            envMapIntensity={0.5}
                        />
                    </mesh>
                ))}
            </group>

            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI * 3 / 4} 
                autoRotate
                autoRotateSpeed={1}
            />
        </>
    );
};

export default ThreeDLoader;