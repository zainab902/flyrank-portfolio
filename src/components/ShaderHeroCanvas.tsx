'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// GLSL VERTEX SHADER
// Passes standard UV coordinates and projected vertex positions to the fragment stage.
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
// Creates a fluid, domain-warped cosmic aurora with interactive mouse distortion.
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
    // 1. Normalize screen coordinates (-1.0 to 1.0, aspect-ratio corrected)
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // 2. Normalize mouse position coordinates
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // 3. Compute distance vector from cursor for local flow warping
    float mouseDist = length(st - mouse * 0.4);
    vec2 st0 = st;

    // 4. Multi-layer domain warping (iterative sinusoidal displacement)
    for (float i = 1.0; i < 4.0; i++) {
      st.x += 0.35 / i * sin(i * 2.8 * st.y + u_time * 0.35 + mouseDist * 0.4);
      st.y += 0.35 / i * cos(i * 2.8 * st.x + u_time * 0.35);
    }

    // 5. Calculate fluid interference wave patterns
    float wave = sin(st.x + st.y) * 0.5 + 0.5;

    // 6. Custom Palette Selection: Deep Slate -> Emerald Green -> Cyber Cyan -> Deep Navy
    vec3 a = vec3(0.02, 0.05, 0.10);  // Dark slate base
    vec3 b = vec3(0.05, 0.45, 0.35);  // Emerald brightness scale
    vec3 c = vec3(1.0, 1.0, 1.0);     // Wave frequency
    vec3 d = vec3(0.0, 0.33, 0.67);    // Color phase shifts

    vec3 color = colorPalette(wave + length(st0) * 0.15, a, b, c, d);

    // 7. Edge Vignette Pass: Darkens screen borders to safeguard typography contrast
    float vignette = 1.0 - smoothstep(0.4, 1.6, length(st0));
    color *= vignette * 0.85;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({ isReducedMotion }: { isReducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  // Initialize Uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    }),
    []
  );

  // Keep resolution uniform updated on window resize
  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  // Mouse event listener tracking normalized screen cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(e.clientX, window.innerHeight - e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [uniforms]);

  // Animation Loop: Pause time evolution if prefers-reduced-motion is active
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

  // Detect accessibility system settings for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]} // Capped devicePixelRatio for responsible performance
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ShaderPlane isReducedMotion={isReducedMotion} />
    </Canvas>
  );
}