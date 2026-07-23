export default function WorkPage() {
  const projects = [
    {
      title: 'NexLodge — Smart Hostel & Flat Management System',
      description:
        'A comprehensive property management platform built with React, Node.js, PostgreSQL, and Flutter for automated room allocation, tenant billing, and maintenance requests.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Flutter'],
    },
    {
      title: 'EventVibe Enterprise Systems',
      description:
        'Multi-tenant event scheduling and resource management system using the MERN stack with RESTful API integration and role-based access control.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-3 text-white">Work & Case Studies</h1>
      <p className="text-slate-400 mb-8">
        Featured software engineering projects and full-stack applications.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-colors"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-slate-400 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}