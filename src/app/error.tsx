'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Route Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md text-center shadow-2xl">
        <h2 className="text-lg font-bold text-red-400 mb-2">Something went wrong!</h2>
        <p className="text-xs text-slate-400 mb-6">
          The application encountered an unexpected runtime error.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}