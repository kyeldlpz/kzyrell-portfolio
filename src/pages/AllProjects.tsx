import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import { projects } from '../data/projects';

export default function AllProjects() {
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
        <Link to="/" className="section-link inline-flex items-center gap-2 mb-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
        </Link>

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

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div className="project-card-media">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={project.cover ? 'w-full h-full object-cover' : 'w-full h-full object-contain bg-white'}
                />
              </div>
              <div className="project-card-body">
                <span className="project-num">Project {String(index + 1).padStart(2, '0')}</span>
                <h2 className="project-title mt-3">{project.title}</h2>
                <p className="project-card-desc">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.services.map((service) => (
                    <span key={service} className="tag">{service}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
