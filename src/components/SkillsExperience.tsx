const stack = {
  Frontend: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'C++'],
  'Tools & Platforms': ['Git','Github', 'VS Code', 'AWS', 'Google Colab', 'Claude AI', 'ChatGPT', 'Copilot', 'Supabase'],
};

const timeline = [
  {
    year: 'Now',
    title: 'Freelance Programmer | Developer',
    org: 'S.P Madrid & Associates',
  },
  {
    year: '2026',
    title: 'AI Prompt Engineer Intern',
    org: 'S.P Madrid & Associates',
  },
  {
    year: '2022',
    title: 'Computer Engineering Student',
    org: 'Pamantasan ng Lungsod ng Maynila (PLM)',
  },
  {
    year: '2020',
    title: 'Started Coding Journey',
    org: 'HTML & CSS — "Hello World"',
  },
];

export default function SkillsExperience() {
  return (
    <section id="skills-experience" className="section-container">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Tech Stack — Left */}
        <div>
          <h2 className="section-title">Tech Stack</h2>
          <div className="space-y-5">
            {Object.entries(stack).map(([category, techs]) => (
              <div key={category}>
                <h3 className="text-xs text-muted font-medium mb-2">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {techs.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience — Right */}
        <div>
          <h2 className="section-title">Experience</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 py-3 border-b border-border last:border-0">
                <span className="font-mono text-xs text-muted w-10 shrink-0 pt-0.5">{item.year}</span>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
