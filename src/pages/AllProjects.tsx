import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import { projects } from '../data/projects';

export default function AllProjects() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'All Projects | Kzyrell Dela Paz';
  }, []);

  return (
    <div className="page-shell min-h-screen bg-bg text-ink">
      <div className="page-orb page-orb-one" />
      <div className="page-orb page-orb-two" />
      <div className="page-grid" />
      <CustomCursor />
      <div className="section-container py-24">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="section-link inline-flex items-center gap-2 mb-8"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
        </button>

        <div className="contact-panel mb-12">
          <div className="contact-copy">
            <div className="section-label mb-5">Archive</div>
            <h1 className="projects-heading mb-4">
              A broader look at the <em>work</em>
            </h1>
            <p className="section-intro max-w-2xl">
              Infrastructure studies, full-stack delivery, and systems projects that shaped
              how I think about reliability, clarity, and user-facing execution.
            </p>
          </div>
        </div>

        <div>
          {projects.map((project, index) => (
            <div key={project.title}>
              <button
                type="button"
                className="project-item w-full text-left"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <span className="font-mono text-xs tracking-wider relative z-[1]" style={{ color: 'var(--text-muted)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative z-[1]">
                  <span className="project-title-name">{project.title}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.services.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="project-arrow relative z-[1]">↗</span>
              </button>

              {expanded === index && (
                <div className="grid md:grid-cols-[280px_1fr] gap-6 py-6 px-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="overflow-hidden rounded-lg" style={{ border: '1px solid var(--border)' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className={project.cover ? 'w-full h-full object-cover' : 'w-full h-full object-contain bg-white'}
                    />
                  </div>
                  <p className="text-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
