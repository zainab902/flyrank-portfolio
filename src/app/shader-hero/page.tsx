'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ShaderHeroCanvas = dynamic(
  () => import('../../components/ShaderHeroCanvas'),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-slate-900 -z-10" />,
  }
);

export default function ShaderHeroPage() {
  return (
    <div className="relative min-h-screen text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <ShaderHeroCanvas />
      </div>

      <header className="w-full border-b border-slate-700/40 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-emerald-400 hover:opacity-90">
            ZS<span className="text-white">.</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate-200 hover:text-white transition-colors">
              ← Portfolio Home
            </Link>
            <span className="text-xs font-mono text-emerald-300 border border-emerald-500/40 bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
              FE-AA3: Custom Shader Hero
            </span>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 flex flex-col justify-center items-center text-center py-20 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-6 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          GLSL Domain-Warped Fluid Hero
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-xl">
          Designing Resilient Systems <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            & Interactive Experiences
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mb-8 leading-relaxed drop-shadow bg-slate-950/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md">
          A custom fragment shader utilizing multi-layered domain warping, live mouse vector influence, and cosine color palettes to deliver a dynamic visual signature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
          <Link
            href="/work"
            className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl transition-all text-center shadow-xl shadow-emerald-400/20"
          >
            Explore Projects
          </Link>
          <Link
            href="/3d-demo"
            className="bg-slate-900/70 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 font-medium px-7 py-3.5 rounded-xl transition-all text-center backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span>🧊</span> View 3D Configurator
          </Link>
        </div>

        <div className="w-full bg-slate-900/70 border border-slate-700/60 backdrop-blur-md rounded-2xl p-6 text-left text-xs text-slate-200 space-y-2.5 shadow-2xl">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-700/60 pb-2">
            <span>✨</span> Shader Technical Architecture & GLSL Uniforms
          </h3>
          <p>
            Domain Warping Loop: Uses sinusoidal position displacements across four iterations to compute organic fluid motions without heavy textures.
          </p>
          <p>
            Uniform Integration: Consumes u_time for frame progression, u_resolution for screen aspect ratio correction, and u_mouse for real-time cursor attraction vectors.
          </p>
          <p>
            Performance & Fallbacks: Capped devicePixelRatio at [1, 2]. Automatically listens to prefers-reduced-motion to freeze time evolution for accessibility.
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-800/40 bg-slate-950/40 py-4 text-center text-xs text-slate-300 backdrop-blur-md z-10">
        <p>© {new Date().getFullYear()} Zainab Sultan. Custom GLSL Shader Implementation.</p>
      </footer>
    </div>
  );
}