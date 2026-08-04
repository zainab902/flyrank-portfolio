import React from 'react';

interface ToolPartProps {
  toolInvocation: {
    toolName: string;
    state: 'call' | 'result' | 'partial-call';
    args?: Record<string, any>;
    result?: any;
    error?: string;
  };
}

export function ToolPartRenderer({ toolInvocation }: ToolPartProps) {
  const { state, args, result, error } = toolInvocation;

  // State 1: Streaming Input
  if (state === 'partial-call') {
    return (
      <div className="p-3 my-2 border border-blue-500/30 bg-blue-950/20 rounded-lg animate-pulse text-xs text-blue-300">
        ⚡ Preparing project analysis...
      </div>
    );
  }

  // State 2: Input Available / Executing
  if (state === 'call') {
    return (
      <div className="p-3 my-2 border border-amber-500/30 bg-amber-950/20 rounded-lg text-xs text-amber-300">
        🔍 Evaluating: <code className="bg-black/40 px-1 rounded">{args?.projectName || 'Project'}</code>
      </div>
    );
  }

  // State 3: Execution Error
  if (error || (state === 'result' && result?.error)) {
    return (
      <div className="p-4 my-2 border border-red-500/50 bg-red-950/30 rounded-lg text-sm text-red-300">
        <div className="font-semibold flex items-center gap-2">⚠️ Tool Error</div>
        <p className="mt-1 text-xs opacity-80">{error || result?.error || 'Execution failed.'}</p>
      </div>
    );
  }

  // State 4: Structured Component Output (Score Card)
  if (state === 'result' && result) {
    return (
      <div className="p-4 my-3 border border-emerald-500/40 bg-slate-900 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-slate-100">{result.projectName}</h4>
          <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400">
            {result.status}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400">Overall Score</div>
            <div className="text-lg font-bold text-emerald-400">{result.score}/100</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Architecture</div>
            <div className="text-xs font-semibold text-slate-200">{result.metrics.architecture}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Performance</div>
            <div className="text-xs font-semibold text-slate-200">{result.metrics.performance}</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}