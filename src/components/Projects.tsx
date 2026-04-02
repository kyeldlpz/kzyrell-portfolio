import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="section-container">
      <div className="section-label">Selected work</div>

      <h2 className="projects-heading mb-3">
        Projects with a strong <em>technical spine</em>
      </h2>
      <p className="section-intro mb-10">
        A selection of work spanning full-stack product delivery, AWS infrastructure,
        and hands-on systems projects with practical constraints.
      </p>

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

      <div className="mt-8 text-center">
        <Link to="/projects" className="section-link">View all projects</Link>
      </div>
    </section>
  );
}
