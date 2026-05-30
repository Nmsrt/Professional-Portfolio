import { useState } from 'react';
import { academicProjects, personalProjects } from '../data/data';

/* ── Shared modal (desktop + mobile) ── */
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

/* ── Single project row (used in both layouts) ── */
function ProjRow({ project, onOpen }) {
  return (
    <button type="button" className="prow" onClick={() => onOpen(project)}>
      <div className="prow-thumb">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="prow-info">
        <span className="prow-title">{project.title}</span>
        <span className="prow-meta">{project.meta}</span>
      </div>
      <span className="prow-arrow">›</span>
    </button>
  );
}

/* ── Scrollable project group box ── */
function ProjGroup({ label, count, projects, onOpen }) {
  return (
    <div className="pgroup">
      <div className="pgroup-head">
        <span className="pgroup-label">{label}</span>
        <span className="pgroup-count">{count}</span>
      </div>
      <div className="pgroup-list">
        {projects.map((p) => (
          <ProjRow key={p.title} project={p} onOpen={onOpen} />
        ))}
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

          {/* ══════════════════════════════════
              DESKTOP LAYOUT
              [Thesis pinned] [Academic box] [Personal box]
          ══════════════════════════════════ */}
          <div className="projects-desktop">
            <div className="section-header center" style={{ marginBottom: '16px' }}>
              <h2>Projects</h2>
            </div>

            <div className="proj-desktop-grid">

              {/* LEFT: Thesis pinned card */}
              <div className="proj-thesis-card" onClick={() => setActive(drumxroll)} role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActive(drumxroll)}>
                <div className="proj-thesis-card-img">
                  <img src="/assets/DrumXRoll Logo.png" alt="DrumXRoll" />
                </div>
                <div className="proj-thesis-card-body">
                  <div className="proj-thesis-card-badges">
                    <span className="badge">THESIS</span>
                    <span className="badge badge-soft">2024–2026</span>
                  </div>
                  <h3>DrumXRoll</h3>
                  <p>XR drumming trainer with a 3D piano-roll guide and real-time visual feedback for improvisation practice.</p>
                  <div className="proj-thesis-card-links" onClick={(e) => e.stopPropagation()}>
                    <a className="btn btn-primary"   href="https://github.com/NeoMonserrat/DrumXRoll" target="_blank" rel="noreferrer">GitHub</a>
                    <a className="btn btn-secondary" href="https://drive.google.com/file/d/1pkJPmJvR6s6iNmPX9SRxbzJMfDvcBS0d/view?usp=sharing" target="_blank" rel="noreferrer">Demo</a>
                    <a className="btn btn-secondary" href="https://drive.google.com/file/d/1nuJ8-bDYmKXGdXGlJn9ZomzhMH-TevM5/view?usp=sharing" target="_blank" rel="noreferrer">Paper</a>
                  </div>
                </div>
              </div>

              {/* RIGHT: two scrollable group boxes */}
              <div className="proj-groups">
                <ProjGroup label="Academic" count={academicProjects.length} projects={academicProjects} onOpen={setActive} />
                <ProjGroup label="Personal" count={personalProjects.length} projects={personalProjects} onOpen={setActive} />
              </div>

            </div>
          </div>

          {/* ══════════════════════════════════
              MOBILE LAYOUT
              Thesis pinned → Academic box → Personal box
          ══════════════════════════════════ */}
          <div className="projects-mobile">
            <div className="mob-section-head">
              <span className="mob-eyebrow">Portfolio</span>
              <h2 className="mob-h2">Projects</h2>
            </div>

            {/* Thesis pinned row */}
            <button type="button" className="proj-thesis-row" onClick={() => setActive(drumxroll)}>
              <div className="proj-thesis-img">
                <img src="/assets/DrumXRoll Logo.png" alt="DrumXRoll" />
              </div>
              <div className="proj-thesis-body">
                <span className="proj-thesis-tag">THESIS</span>
                <span className="prow-title">DrumXRoll</span>
                <span className="prow-meta">XR · Unity · 2024–2026</span>
              </div>
              <span className="prow-arrow">›</span>
            </button>

            {/* Scrollable group boxes stacked */}
            <ProjGroup label="Academic" count={academicProjects.length} projects={academicProjects} onOpen={setActive} />
            <ProjGroup label="Personal" count={personalProjects.length} projects={personalProjects} onOpen={setActive} />
          </div>
        </div>
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

export default Projects;
