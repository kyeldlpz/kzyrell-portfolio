export default function About() {
  return (
    <section id="about" className="section-container">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="w-36 h-36 rounded-2xl overflow-hidden border border-border bg-surface flex-shrink-0">
          <img
            src="/profile.jpg"
            alt="Kzyrell A. Dela Paz"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Kzyrell A. Dela Paz</h1>
          <p className="text-sm text-muted flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Metro Manila, Philippines
          </p>
          <p className="text-base text-secondary">
            Computer Engineering Student \ Freelancer \ Developer 
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:kzyrellyan@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-border-hover hover:bg-surface transition-colors text-muted hover:text-accent"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Send Email
            </a>
            <a
              href="https://github.com/kyeldlpz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-border-hover hover:bg-surface transition-colors text-muted hover:text-accent"
            >
              GitHub
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kzyrell-dela-paz-b04395351/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-border-hover hover:bg-surface transition-colors text-muted hover:text-accent"
            >
              LinkedIn
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* About Text */}
      <h2 className="section-title">About</h2>
      <div className="space-y-3 text-sm text-muted leading-relaxed">
        <p>
          I'm a Computer Engineering student and freelance developer, currently serving as
          Cloud & Infrastructure Associate at Cloud Club – Haribon. I have a growing passion
          for web development, artificial intelligence, and cloud technologies, and I'm actively
          building my foundation in modern web technologies while exploring how AI and cloud
          services can power scalable, intelligent applications.
        </p>
        <p>
          Through hands-on projects, freelance work, and continuous learning, I'm developing
          skills across front-end and back-end development alongside a growing understanding
          of AWS services and cloud best practices. I enjoy experimenting with new tools,
          frameworks, and emerging technologies — especially at the intersection of web, AI,
          and cloud infrastructure.
        </p>
        <p>
          Driven by curiosity and a commitment to growth, I aim to become a versatile developer
          capable of designing and deploying efficient, secure, and user-focused applications
          powered by modern cloud solutions.
        </p>
      </div>
    </section>
  );
}
