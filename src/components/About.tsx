const timeline = [
  { year: 'Now', title: 'Freelance Programmer | Developer', org: 'S.P Madrid & Associates' },
  { year: '2026', title: 'AI Prompt Engineer Intern', org: 'S.P Madrid & Associates' },
  { year: '2022', title: 'Computer Engineering Student', org: 'Pamantasan ng Lungsod ng Maynila (PLM)' },
  { year: '2020', title: 'Started Coding Journey', org: 'HTML & CSS — "Hello World"' },
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <div className="section-label">About</div>

      <h2 className="about-heading mb-12">
        Engineer at heart, <em>builder&nbsp;by&nbsp;nature</em>.
      </h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 items-start">
        {/* Left — Bio + Tags */}
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-secondary">
            Computer Engineering student and freelance developer serving as
            Cloud &amp; Infrastructure Associate at Cloud Club — Haribon. Passionate about
            web development, AI, and cloud technologies.
          </p>
          <p className="text-base leading-relaxed text-secondary">
            Building across front-end, back-end, and AWS while experimenting with
            emerging tools at the intersection of web, AI, and cloud infrastructure.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="tag">React</span>
            <span className="tag">TypeScript</span>
            <span className="tag">Tailwind CSS</span>
            <span className="tag">AWS</span>
            <span className="tag">Python</span>
            <span className="tag">Cloud</span>
          </div>
        </div>

        {/* Right — Experience Timeline */}
        <div>
          <div className="section-label">Experience</div>
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-5 py-3 border-t border-border last:border-b">
              <span className="font-mono text-[11px] text-muted w-10 shrink-0 pt-0.5">{item.year}</span>
              <div>
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">{item.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
