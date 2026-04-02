const stack = {
  Frontend: {
    icon: '◇ 01',
    desc: 'JavaScript, TypeScript, React, Next.js, Tailwind CSS, HTML, CSS',
  },
  Backend: {
    icon: '◇ 02',
    desc: 'Node.js, Python, FastAPI, PostgreSQL, SQLite, C++',
  },
  'Tools & Cloud': {
    icon: '◇ 03',
    desc: 'Git, GitHub, VS Code, AWS, Google Colab, Supabase, Claude AI, ChatGPT, Copilot',
  },
};

export default function SkillsExperience() {
  return (
    <section id="skills-experience" className="section-container">
      <div className="section-label">Skills</div>

      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(stack).map(([category, { icon, desc }]) => (
          <div key={category} className="skill-card">
            <div className="skill-card-icon">{icon}</div>
            <h3 className="skill-card-title">{category}</h3>
            <p className="skill-card-body">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
