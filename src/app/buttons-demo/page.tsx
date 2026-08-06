'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SmartButton } from '../../components/SmartButton';
export default function ButtonsDemoPage() {
  const [log, setLog] = useState<string>('Ready to test. Click a trigger below.');

  const handleAction = async (forceResult?: 'success' | 'error') => {
    setLog('Request initiated... waiting 1.5s delay...');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (forceResult === 'error') {
      setLog('❌ Request failed (Forced Error State)');
      throw new Error('Forced Error');
    }

    if (forceResult === 'success') {
      setLog('✅ Request succeeded (Forced Success State)');
      return;
    }

    // 20% Random failure test
    const isRandomError = Math.random() < 0.2;
    if (isRandomError) {
      setLog('❌ Request failed (Random 20% Failure triggered)');
      throw new Error('Random Error');
    } else {
      setLog('✅ Request succeeded (80% Random Success path)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 font-sans flex flex-col items-center">
      {/* Header Nav */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-1">
          ← Back to Portfolio Home
        </Link>
        <span className="text-xs font-mono text-slate-500">FE-AA1: Buttons with a Brain</span>
      </div>

      <main className="w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
          Buttons with a Brain Showcase
        </h1>
        <p className="text-slate-400 text-sm max-w-md mb-10">
          A state-communicating button component designed with intentional, interruptible motion choreography and zero layout shift.
        </p>

        {/* Primary Interactive Demo Card */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl flex flex-col items-center gap-8 mb-12">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Interactive Component
          </div>

          {/* The Smart Button */}
          <div className="py-4">
            <SmartButton onAction={handleAction} />
          </div>

          {/* Explicit State Triggers (Required by Q&A) */}
          <div className="flex flex-wrap gap-3 justify-center w-full pt-4 border-t border-slate-800/80">
            <button
              onClick={() => handleAction('success')}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              🎯 Trigger Force Success
            </button>
            <button
              onClick={() => handleAction('error')}
              className="px-3.5 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-700/50 text-red-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              💥 Trigger Force Error
            </button>
          </div>

          {/* Status Log Box */}
          <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-left font-mono text-xs text-slate-400">
            <span className="text-slate-500">Log: </span>
            <span>{log}</span>
          </div>
        </div>

        {/* Motion Rationale & Documentation Note */}
        <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 text-left text-xs leading-relaxed text-slate-300 space-y-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <span>📐</span> Motion Design & Easing Rationale
          </h3>
          <p>
            • <strong>Eases & Durations:</strong> Utilizes a spring transition (<code className="text-emerald-400 font-mono">stiffness: 400, damping: 25, mass: 0.8</code>) for crisp, responsive state feedback without unnatural bounce. Text slides on the Y-axis inside a fixed-height container to eliminate layout thrash and cumulative layout shift (CLS).
          </p>
          <p>
            • <strong>Interruptibility & Safety:</strong> Spam-clicking during the <code className="text-emerald-400 font-mono">loading</code> state is explicitly blocked via state guards. State changes use Framer Motion&apos;s <code className="text-emerald-400 font-mono">AnimatePresence mode=&quot;wait&quot;</code> to prevent overlapping text artifacts during rapid toggles.
          </p>
          <p>
            • <strong>Accessibility & Motion Control:</strong> Focus states feature a visible <code className="text-emerald-400 font-mono">ring-2 ring-emerald-400</code> outline. Respects user <code className="text-emerald-400 font-mono">prefers-reduced-motion</code> settings by removing spatial movement (slide/shake) while preserving instant color and state text feedback.
          </p>
        </div>
      </main>
    </div>
  );
}