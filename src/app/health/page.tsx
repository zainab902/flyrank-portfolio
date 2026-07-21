export const revalidate = 0;

export default async function HealthPage() {
  const timestamp = new Date().toISOString();

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-400 mb-4">System Health Status</h1>
        <div className="space-y-3 font-mono text-sm">
          <p><span className="text-slate-400">Status:</span> <span className="text-emerald-400 font-semibold">200 OK</span></p>
          <p><span className="text-slate-400">Environment:</span> Production</p>
          <p><span className="text-slate-400">Server Time:</span> {timestamp}</p>
        </div>
      </div>
    </main>
  );
}