'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface SmartButtonProps {
  onAction?: (forceResult?: 'success' | 'error') => Promise<void>;
}

export function SmartButton({ onAction }: SmartButtonProps) {
  const [state, setState] = useState<ButtonState>('idle');
  const shouldReduceMotion = useReducedMotion();

  const handleClick = async (forceResult?: 'success' | 'error') => {
    if (state === 'loading') return;

    setState('loading');

    try {
      if (onAction) {
        await onAction(forceResult);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (forceResult === 'error') throw new Error('Simulated failure');
      }
      setState('success');
    } catch {
      setState('error');
    }

    setTimeout(() => {
      setState('idle');
    }, 2500);
  };

  // Fixed with 'as const' so Framer Motion TypeScript types accept it cleanly
  const transitionSpec = {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  } as const;

  return (
    <motion.button
      type="button"
      onClick={() => handleClick()}
      disabled={state === 'loading'}
      aria-label="Send Message AI Assistant"
      animate={
        state === 'error' && !shouldReduceMotion
          ? { x: [-8, 8, -6, 6, -3, 3, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.4 }}
      whileHover={state === 'idle' && !shouldReduceMotion ? { scale: 1.03 } : {}}
      whileTap={state === 'idle' && !shouldReduceMotion ? { scale: 0.97 } : {}}
      className={`relative inline-flex items-center justify-center min-w-[160px] h-12 px-6 rounded-xl font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 shadow-lg cursor-pointer select-none overflow-hidden ${
        state === 'idle'
          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
          : state === 'loading'
          ? 'bg-slate-800 text-slate-300 shadow-none cursor-wait'
          : state === 'success'
          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
          : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
      }`}
    >
      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={transitionSpec}
            className="flex items-center gap-2"
          >
            <span>Send Message</span>
            <span>⚡</span>
          </motion.span>
        )}

        {/* LOADING STATE */}
        {state === 'loading' && (
          <motion.span
            key="loading"
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
            transition={transitionSpec}
            className="flex items-center gap-2 font-mono text-xs"
          >
            <svg
              className="animate-spin h-4 w-4 text-emerald-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Sending...</span>
          </motion.span>
        )}

        {/* SUCCESS STATE */}
        {state === 'success' && (
          <motion.span
            key="success"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={transitionSpec}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Sent Successfully!</span>
          </motion.span>
        )}

        {/* ERROR STATE */}
        {state === 'error' && (
          <motion.span
            key="error"
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={transitionSpec}
            className="flex items-center gap-2"
          >
            <span>⚠️ Failed - Click Retry</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}