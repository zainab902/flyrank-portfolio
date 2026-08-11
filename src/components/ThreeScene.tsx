'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  color: string;
  wireframe: boolean;
  roughness: number;
  metalness: number;
  autoRotate: boolean;
  distortion: number;
}

function InteractiveModel({ color, wireframe, roughness, metalness, autoRotate, distortion }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          distort={distortion}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export function ThreeScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full touch-none"
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={props.color} />

      <InteractiveModel {...props} />

      <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
      />
    </Canvas>
  );
}