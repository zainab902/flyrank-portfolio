'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy-load the WebGL Canvas with SSR disabled
const ShaderHeroCanvas = dynamic(
  () => import('../../components/ShaderHeroCanvas').then((mod) => mod.ShaderHeroCanvas),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-slate-950 -z-10" />,
  }
);

export default function ShaderHeroPage() {
  return (
    <div className="relative min-h-screen bg-slate-950/80 text-slate-100 font-sans flex flex-col justify-between overflow-hidden">
      {/* Background Fullscreen Shader Canvas */}
      <ShaderHeroCanvas />

      {/* Navigation Bar */}
      <header className="w-full border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-emerald-400 hover:opacity-90">
            ZS<span className="text-white">.</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              ← Portfolio Home
            </Link>
            <span className="text-xs font-mono text-slate-400 border border-slate-700/80 bg-slate-900/60 px-2.5 py-1 rounded-full">
              FE-AA3: Custom Shader Hero
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 flex flex-col justify-center items-center text-center py-20 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-emerald-400 mb-6 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          GLSL Domain-Warped Fluid Hero
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          Designing Resilient Systems <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            & Interactive Experiences
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mb-8 leading-relaxed drop-shadow bg-slate-950/40 p-4 rounded-xl border border-slate-800/40 backdrop-blur-sm">
          A custom fragment shader utilizing multi-layered domain warping, live mouse vector influence, and cosine color palettes to deliver a dynamic visual signature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
          <Link
            href="/work"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-7 py-3.5 rounded-xl transition-all text-center shadow-xl shadow-emerald-500/20"
          >
            Explore Projects
          </Link>
          <Link
            href="/3d-demo"
            className="bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 font-medium px-7 py-3.5 rounded-xl transition-all text-center backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span>🧊</span> View 3D Configurator
          </Link>
        </div>

        {/* Shader Architecture Breakdown Card */}
        <div className="w-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 text-left text-xs text-slate-300 space-y-2.5 shadow-2xl">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <span>✨</span> Shader Technical Architecture & GLSL Uniforms
          </h3>
          <p>
            • <strong>Domain Warping Loop:</strong> Uses sinusoidal position displacements across four iterations (`for (float i = 1.0; i &lt; 4.0; i++)`) to compute complex organic fluid motions without heavy texture samplers.
          </p>
          <p>
            • <strong>Uniform Integration:</strong> Consumes <code>u_time</code> for frame progression, <code>u_resolution</code> for screen aspect ratio correction, and <code>u_mouse</code> for real-time cursor attraction vectors.
          </p>
          <p>
            • <strong>Performance & Fallbacks:</strong> Capped <code>devicePixelRatio</code> at <code>[1, 2]</code>. Automatically listens to <code>prefers-reduced-motion</code> to freeze time evolution, providing a still gradient background for sensitive contexts.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500 backdrop-blur-md z-10">
        <p>© {new Date().getFullYear()} Zainab Sultan. Custom GLSL Shader Implementation.</p>
      </footer>
    </div>
  );
}