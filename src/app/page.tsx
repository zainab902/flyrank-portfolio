'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useChat } from '@ai-sdk/react';
import { ToolPartRenderer } from '../components/ToolPartRenderer';

export default function Home() {
  const [textInput, setTextInput] = useState('');

  const chat = (useChat as any)({
    api: '/api/chat',
    onError: (err: any) => {
      console.error('Chat interface stream error:', err);
    },
  });

  const messages: any[] = chat.messages || [];
  const append = chat.append;
  const error = chat.error;
  const reload = chat.reload;
  const status = chat.status;

  const isLoading = status === 'streaming' || status === 'submitted' || Boolean(chat.isLoading);

  // Trigger submission using append with standard Message format
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = textInput.trim();
    if (!messageText || isLoading) return;

    // Clear input state immediately so UI feels responsive
    setTextInput('');

    if (append) {
      await append({
        role: 'user',
        content: messageText,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-emerald-400 hover:opacity-90">
            ZS<span className="text-white">.</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/work" className="text-slate-300 hover:text-white transition-colors">
              Work
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/health" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Health-Check
            </Link>
            <Link
              href="/contact"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto px-6 flex flex-col justify-start items-center text-center py-12 w-full">
        {/* Hero Section */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for SaaS & Product Engineering
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          I build resilient multi-tenant backends & Web applications.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Specializing in JWT authorization contexts, PostgreSQL data isolation, and clean API design that solves real coordination problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
          <Link
            href="/work"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-lg transition-all text-center shadow-lg shadow-emerald-500/10"
          >
            View Case Studies
          </Link>
          <Link
            href="/health"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium px-6 py-3.5 rounded-lg transition-all text-center"
          >
            System Status (/health)
          </Link>
        </div>

        {/* Interactive AI Chat Section */}
        <section className="w-full max-w-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden text-left shadow-2xl flex flex-col min-h-[480px]">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-semibold text-slate-200">Portfolio Assistant AI</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Claude 3.5 Sonnet + Tools</span>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[400px]">
            {/* FE-08: Designed Empty State */}
            {messages.length === 0 && (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg mb-3">
                  💬
                </div>
                <h4 className="text-sm font-semibold text-slate-200 mb-1">Ask the AI Assistant</h4>
                <p className="text-xs text-slate-400 max-w-md mb-6">
                  Explore architectural details, tech stack capabilities, or evaluate project performance directly.
                </p>

                {/* Quick Action Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      append && append({ role: 'user', content: 'Score my Next.js chat project' });
                    }}
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 text-left transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>⚡</span> Score my Next.js chat project
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      append && append({ role: 'user', content: 'What stack and tools does Zainab use?' });
                    }}
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 text-left transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>⚙️</span> What stack & tools are used here?
                  </button>
                </div>
              </div>
            )}

            {/* Rendered Messages */}
            {messages.map((m: any) => (
              <div
                key={m.id || Math.random()}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.content}

                  {/* Tool Invocations */}
                  {m.toolInvocations?.map((toolInvocation: any) => (
                    <ToolPartRenderer 
                      key={toolInvocation.toolCallId || Math.random()} 
                      toolInvocation={toolInvocation} 
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* FE-08: Skeleton Loading State */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl rounded-tl-none text-xs text-slate-400 animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Generating response...
                </div>
              </div>
            )}

            {/* FE-08: Designed Error State with Working Retry */}
            {error && (
              <div className="p-4 bg-red-950/30 border border-red-500/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-200">
                <div>
                  <div className="font-semibold text-xs text-red-400 flex items-center gap-1.5">
                    ⚠️ Connection or Model Error
                  </div>
                  <p className="text-[11px] text-red-300/80 mt-0.5">
                    {error.message || 'Stream connection dropped unexpectedly.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => reload && reload()}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  🔄 Retry Message
                </button>
              </div>
            )}
          </div>

          {/* Form setup: ensure button click and enter key both fire handleFormSubmit */}
          <form onSubmit={handleFormSubmit} className="p-3.5 border-t border-slate-800 bg-slate-900/90 flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your query or ask to evaluate a project..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !textInput.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Zainab Sultan. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}