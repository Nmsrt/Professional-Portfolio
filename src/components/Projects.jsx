import { useState } from 'react';
import { academicProjects, personalProjects } from '../data/data';

function ProjectRow({ project, onOpen }) {
  return (
    <button type="button" className="proj-row" onClick={() => onOpen(project)}>
      <div className="proj-row-thumb">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="proj-row-body">
        <span className="proj-row-title">{project.title}</span>
        <span className="proj-row-meta">{project.meta}</span>
      </div>
      <span className="proj-row-arrow">›</span>
    </button>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="proj-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="proj-modal-image">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="proj-modal-body">
          <p className="proj-modal-meta">{project.meta}</p>
          <h3 className="proj-modal-title">{project.title}</h3>
          <p className="proj-modal-summary">{project.summary}</p>
          <a className="btn btn-primary proj-modal-cta" href={project.link} target="_blank" rel="noreferrer">
            View Project →
          </a>
        </div>
      </div>
    </div>
  );
}

const drumxroll = {
  title: 'DrumXRoll',
  meta: 'XR · HXIL · Unity · 2024–2026',
  summary: 'An XR drumming trainer with a 3D piano-roll guide and real-time visual feedback designed to improve improvisation practice, timing, and engagement.',
  image: '/assets/DrumXRoll Logo.png',
  link: 'https://github.com/NeoMonserrat/DrumXRoll',
};

function Projects() {
  const [active, setActive] = useState(null);

  return (
    <>
      <section id="projects" className="section matrix-section animate-on-scroll">
        <div className="wide-shell">
          <span className="matrix-section-num">04</span>

          {/* ══ DESKTOP ══ */}
          <div className="projects-desktop">
            <div className="section-header center"><h2>Projects</h2></div>

            <article id="featured" className="featured-card">
              <div className="featured-media">
                <img src="/assets/DrumXRoll Logo.png" alt="DrumXRoll project banner" />
              </div>
              <div className="featured-content">
                <div className="badge-row">
                  <span className="badge">THESIS · 2024–2026</span>
                  <span className="badge badge-soft">XR · HXIL · Unity</span>
                </div>
                <h3>DrumXRoll: Exploring XR Piano Roll in Teaching Drum Improvisation</h3>
                <p>An XR drumming trainer with a 3D piano-roll guide and real-time visual feedback designed to improve improvisation practice, timing, and engagement.</p>
                <div className="action-row">
                  <a className="btn btn-primary" href="https://github.com/NeoMonserrat/DrumXRoll">View Project</a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1pkJPmJvR6s6iNmPX9SRxbzJMfDvcBS0d/view?usp=sharing">Watch demo</a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1nuJ8-bDYmKXGdXGlJn9ZomzhMH-TevM5/view?usp=sharing">Read paper</a>
                </div>
              </div>
            </article>

            <div className="project-columns">
              <div>
                <div className="column-head"><h3>Academic Projects</h3><span>{academicProjects.length}</span></div>
                <div className="project-stack">
                  {academicProjects.map((p) => (
                    <a className="card project-card project-card-media" key={p.title} href={p.link}>
                      <div className="project-card-image-wrap"><img src={p.image} alt={p.title} className="project-card-image" /></div>
                      <div className="project-card-body"><h4>{p.title}</h4><p className="project-meta">{p.meta}</p><p>{p.summary}</p></div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="column-head"><h3>Personal Projects</h3><span>{personalProjects.length}</span></div>
                <div className="project-stack">
                  {personalProjects.map((p) => (
                    <a className="card project-card project-card-media" key={p.title} href={p.link}>
                      <div className="project-card-image-wrap"><img src={p.image} alt={p.title} className="project-card-image" /></div>
                      <div className="project-card-body"><h4>{p.title}</h4><p className="project-meta">{p.meta}</p><p>{p.summary}</p></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ MOBILE ══ */}
          <div className="projects-mobile">
            <div className="mob-section-head">
              <span className="mob-eyebrow">Portfolio</span>
              <h2 className="mob-h2">Projects</h2>
            </div>

            {/* Thesis feature row */}
            <button type="button" className="proj-thesis-row" onClick={() => setActive(drumxroll)}>
              <div className="proj-thesis-img">
                <img src="/assets/DrumXRoll Logo.png" alt="DrumXRoll" />
              </div>
              <div className="proj-thesis-body">
                <span className="proj-thesis-tag">THESIS</span>
                <span className="proj-row-title">DrumXRoll</span>
                <span className="proj-row-meta">XR · Unity · 2024–2026</span>
              </div>
              <span className="proj-row-arrow">›</span>
            </button>

            {/* Academic */}
            <div className="proj-group-label">
              <span>Academic</span>
              <span className="proj-group-count">{academicProjects.length}</span>
            </div>
            {academicProjects.map((p) => <ProjectRow key={p.title} project={p} onOpen={setActive} />)}

            {/* Personal */}
            <div className="proj-group-label">
              <span>Personal</span>
              <span className="proj-group-count">{personalProjects.length}</span>
            </div>
            {personalProjects.map((p) => <ProjectRow key={p.title} project={p} onOpen={setActive} />)}
          </div>
        </div>
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

export default Projects;
