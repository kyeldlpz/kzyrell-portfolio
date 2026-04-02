import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const visibleProjects = projects.slice(0, 4);

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="projects" className="section-container">
      <div className="section-label">Personal and Group Projects</div>
      <h2 className="projects-heading mb-4">
        Projects with a stronger <em>technical backbone</em>
      </h2>
      <p className="text-base text-secondary mb-10">
        Full-stack systems, AWS infrastructure, and hands-on engineering.
      </p>

      <div>
        {visibleProjects.map((project, index) => (
          <div key={project.title}>
            <div
              className="project-item"
              onClick={() => toggleExpand(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') toggleExpand(index); }}
            >
              <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
              <div className="relative z-[1]">
                <span className="project-title-name">{project.title}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.services.map((service) => (
                    <span key={service} className="project-meta">{service}</span>
                  ))}
                </div>
              </div>
              <span className="project-arrow">↗</span>
            </div>
            {expanded[index] && (
              <div className="px-[76px] pb-6 text-sm leading-relaxed text-secondary">
                {project.image && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-border">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-auto ${project.cover ? 'object-cover' : 'object-contain bg-white'}`}
                    />
                  </div>
                )}
                <p>{project.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length > visibleProjects.length && (
        <div className="mt-8">
          <Link to="/projects" className="section-link">
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
