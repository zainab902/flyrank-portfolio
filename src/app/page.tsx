import Link from 'next/link';

export default function Home() {
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

      {/* Hero Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 flex flex-col justify-center items-center text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for SaaS & Product Engineering
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          I build resilient multi-tenant backends & Web applications.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Specializing in JWT authorization contexts, PostgreSQL data isolation, and clean API design that solves real coordination problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Zainab Sultan. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}