'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  vec3 colorPalette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    float mouseDist = length(st - mouse);
    float mouseInfluence = smoothstep(1.5, 0.0, mouseDist);

    vec2 p = st * 1.3;

    for (float i = 1.0; i < 4.0; i++) {
      p.x += 0.50 / i * sin(i * 2.2 * p.y + u_time * 0.45 + mouseInfluence * 2.0);
      p.y += 0.50 / i * cos(i * 2.2 * p.x + u_time * 0.45 + mouseInfluence * 2.0);
    }

    float wave = sin(p.x + p.y) * 0.5 + 0.5;

    vec3 a = vec3(0.12, 0.22, 0.32);
    vec3 b = vec3(0.35, 0.85, 0.65);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.33, 0.67);

    vec3 color = colorPalette(wave + p.x * 0.15 + p.y * 0.15, a, b, c, d);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({ isReducedMotion }: { isReducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    }),
    []
  );

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(e.clientX, window.innerHeight - e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [uniforms]);

  useFrame((_, delta) => {
    if (!isReducedMotion && meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function ShaderHeroCanvas() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ShaderPlane isReducedMotion={isReducedMotion} />
    </Canvas>
  );
}