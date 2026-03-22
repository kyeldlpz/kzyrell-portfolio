import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const VISIBLE_COUNT = 4;

  const toggleExpand = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const visibleProjects = projects.slice(0, VISIBLE_COUNT);

  return (
    <section id="projects" className="section-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title !mb-0">Personal and Group Projects</h2>
        {projects.length > VISIBLE_COUNT && (
          <Link
            to="/projects"
            className="text-xs text-accent hover:text-accent-hover transition-colors font-medium flex items-center gap-1"
          >
            View All
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {visibleProjects.map((project, i) => (
          <div
            key={i}
            className="card flex flex-col md:flex-row gap-4"
          >
            <div className={`w-full md:w-60 flex-shrink-0 self-start rounded-lg overflow-hidden border border-border aspect-video flex items-center justify-center ${project.cover ? 'bg-surface' : 'bg-white'}`}>
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${project.cover ? 'object-cover' : 'object-contain'}`}
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
              <p className={`text-xs text-muted leading-relaxed ${expanded[i] ? '' : 'line-clamp-3'}`}>
                {project.description}
              </p>
              <button
                onClick={() => toggleExpand(i)}
                className="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
              >
                {expanded[i] ? 'Show less' : 'Read more'}
              </button>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map(service => (
                  <span key={service} className="tag text-[11px]">{service}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
