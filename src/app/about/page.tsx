export default function AboutPage() {
  const skills = [
    'Next.js',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Python',
    'Java',
    'Flutter',
    'Tailwind CSS',
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-white">About Me</h1>
      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        I am a Software Engineering student and Web Developer focused on building modern, high-performance web applications and scalable backends.
      </p>
      
      <p className="text-slate-400 leading-relaxed mb-8">
        With experience in freelance web development and full-stack engineering, I specialize in crafting clean user interfaces and architecting efficient API systems.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4">Core Technologies</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 text-sm rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono"
          >
            {skill}
          </span>
        ))}
      </div>
    </main>
  );
}