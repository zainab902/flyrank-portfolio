export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-white">Get in Touch</h1>
      <p className="text-slate-400 mb-8">
        Feel free to reach out for software engineering inquiries, project collaborations, or web development opportunities.
      </p>

      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
            Email
          </label>
          <a
            href="mailto:zainabsultan087@gmail.com"
            className="text-emerald-400 hover:underline text-lg font-medium"
          >
            zainabsultan087@gmail.com
          </a>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
            GitHub
          </label>
          <a
            href="https://github.com/zainab902"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 hover:text-emerald-400 transition-colors text-base"
          >
            github.com/zainab902
          </a>
        </div>
      </div>
    </main>
  );
}