export default function HealthPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-white">System Status</h1>
      
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Application State</p>
          <p className="text-xl font-semibold text-emerald-400 flex items-center gap-2 mt-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            Operational
          </p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
          HTTP 200 OK
        </span>
      </div>
    </main>
  );
}