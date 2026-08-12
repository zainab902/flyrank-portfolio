'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// GLSL VERTEX SHADER
// Positions the plane geometry to fill clip space (-1 to 1) completely
// -----------------------------------------------------------------------------
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// -----------------------------------------------------------------------------
// GLSL FRAGMENT SHADER
// Full-screen domain-warped fluid generator without edge fading
// -----------------------------------------------------------------------------
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  // Cosine-based procedural color palette generator
  vec3 colorPalette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    // 1. Aspect-ratio corrected normalized screen coordinates
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // 2. Normalized interactive cursor coordinates
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // 3. Mouse influence radius across screen
    float mouseDist = length(st - mouse);
    float mouseInfluence = smoothstep(1.5, 0.0, mouseDist);

    // 4. Domain scale for full-screen fluid coverage
    vec2 p = st * 1.4;

    // 5. Multi-layer sinusoidal domain warping loop
    for (float i = 1.0; i < 4.0; i++) {
      p.x += 0.45 / i * sin(i * 2.2 * p.y + u_time * 0.4 + mouseInfluence * 1.8);
      p.y += 0.45 / i * cos(i * 2.2 * p.x + u_time * 0.4 + mouseInfluence * 1.8);
    }

    // 6. Calculate wave interference pattern across full screen
    float wave = sin(p.x + p.y) * 0.5 + 0.5;

    // 7. Emerald & Slate color palette
    vec3 a = vec3(0.04, 0.10, 0.18);  // Deep slate background
    vec3 b = vec3(0.18, 0.65, 0.50);  // Emerald / teal glow
    vec3 c = vec3(1.0, 1.0, 1.0);     // Wave frequency
    vec3 d = vec3(0.00, 0.33, 0.67);  // Phase offset

    vec3 color = colorPalette(wave + p.x * 0.12 + p.y * 0.12, a, b, c, d);

    // 8. Output full-screen fluid color directly (no edge vignette cutoff)
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

export function ShaderHeroCanvas() {
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