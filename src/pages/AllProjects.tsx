import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function AllProjects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors font-medium mb-6"
        >
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </Link>

        <h1 className="text-xl font-bold text-foreground mb-6">All Projects</h1>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <div key={i} className="card flex flex-col md:flex-row gap-4">
              <div
                className={`w-full md:w-60 flex-shrink-0 self-start rounded-lg overflow-hidden border border-border aspect-video flex items-center justify-center ${project.cover ? 'bg-surface' : 'bg-white'}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${project.cover ? 'object-cover' : 'object-contain'}`}
                />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((service) => (
                    <span key={service} className="tag text-[11px]">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
