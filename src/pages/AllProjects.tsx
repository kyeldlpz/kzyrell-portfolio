import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../hooks/useTheme';

export default function AllProjects() {
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'All Projects | Kzyrell Dela Paz';
  }, []);

  return (
    <div className="min-h-screen bg-bg text-foreground">
      <CustomCursor />
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-12 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </Link>
          <button type="button" onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            <span className="theme-toggle-icon" aria-hidden="true">{isDark ? '☀' : '☾'}</span>
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        <h1 className="section-title text-2xl">All Projects</h1>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.title} className="card flex flex-col gap-4 md:flex-row">
              <div className={`w-full md:w-64 flex-shrink-0 self-start rounded-lg overflow-hidden border border-border aspect-video flex items-center justify-center ${project.cover ? 'bg-surface' : 'bg-white'}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
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
