const timeline = [
  { year: 'Now', role: 'Freelancer', org: 'S.P Madrid & Associates', detail: 'Building website by agentic coding.' },
  { year: '2026', role: 'AI Prompt Engineering Intern', org: 'S.P Madrid & Associates', detail: 'Building websites as an AI Prompt Engineer Intern' },
  { year: '2022', role: 'Computer Engineering', org: 'Pamantasan ng Lungsod ng Maynila', detail: 'Studying systems design, embedded computing, and software engineering.' },
  { year: '2020', role: 'Hello world!', org: 'Independent', detail: 'Started learning web development and building personal projects.' },
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <div className="section-label">About</div>

      <h2 className="about-heading mb-10">
        Engineer at heart,&nbsp;<em>builder by nature</em>.
      </h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 items-start">
        {/* Left — Bio */}
        <div>
          <p className="text-base leading-[1.85] mb-5" style={{ color: 'var(--text-secondary)' }}>
            I&apos;m a Computer Engineering student and freelance developer, currently serving as
            Cloud &amp; Infrastructure Associate at Cloud Club – Haribon. I have a growing passion
            for web development, artificial intelligence, and cloud technologies, and I&apos;m actively
            building my foundation in modern web technologies while exploring how AI and cloud
            services can power scalable, intelligent applications.
          </p>
          <p className="text-base leading-[1.85] mb-5" style={{ color: 'var(--text-secondary)' }}>
            Through hands-on projects, freelance work, and continuous learning, I&apos;m developing
            skills across front-end and back-end development alongside a growing understanding
            of AWS services and cloud best practices. I enjoy experimenting with new tools,
            frameworks, and emerging technologies, especially at the intersection of web, AI,
            and cloud infrastructure.
          </p>
          <p className="text-base leading-[1.85] mb-7" style={{ color: 'var(--text-secondary)' }}>
            Driven by curiosity and a commitment to growth, I aim to become a versatile developer
            capable of designing and deploying efficient, secure, and user-focused applications
            powered by modern cloud solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'Node.js', 'AWS', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Right — Experience */}
        <div>
          <div className="section-label">Experience</div>
          <div className="flex flex-col gap-6">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-5">
                <span className="shrink-0 font-mono text-xs tracking-wider pt-1" style={{ color: 'var(--text-muted)', minWidth: '3rem' }}>
                  {item.year}
                </span>
                <div>
                  <h4 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.role}</h4>
                  <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
                    {item.org}
                  </span>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
