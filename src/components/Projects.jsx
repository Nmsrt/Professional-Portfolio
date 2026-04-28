import { academicProjects, personalProjects } from '../data/data';

function Projects() {
  return (
 <section id="projects" className="section">
          <div className="wide-shell">
            <div className="section-header section-header-split">
              <div>
                <span className="eyebrow">Portfolio</span>
                <h2>Projects</h2>
              </div>
            </div>

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
                <p>
                  An XR drumming trainer with a 3D piano-roll guide and real-time visual feedback designed to improve
                  improvisation practice, timing, and engagement.
                </p>
                <div className="action-row">
                  <a className="btn btn-primary" href="https://github.com/NeoMonserrat/DrumXRoll">
                    View Project
                  </a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1pkJPmJvR6s6iNmPX9SRxbzJMfDvcBS0d/view?usp=sharing">
                    Watch demo
                  </a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1nuJ8-bDYmKXGdXGlJn9ZomzhMH-TevM5/view?usp=sharing">
                    Read paper
                  </a>
                </div>
              </div>
            </article>

            <div className="project-columns">
              <div>
                <div className="column-head">
                  <h3>Academic Projects</h3>
                  <span>{academicProjects.length}</span>
                </div>
                <div className="project-stack">
                  {academicProjects.map((project) => (
                    <a className="card project-card project-card-media" key={project.title} href={project.link}>
                      <div className="project-card-image-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="project-card-image"
                        />
                      </div>

                      <div className="project-card-body">
                        <h4>{project.title}</h4>
                        <p className="project-meta">{project.meta}</p>
                        <p>{project.summary}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="column-head">
                  <h3>Personal Projects</h3>
                  <span>{personalProjects.length}</span>
                </div>
                <div className="project-stack">
                  {personalProjects.map((project) => (
                    <a className="card project-card project-card-media" key={project.title} href={project.link}>
                      <div className="project-card-image-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="project-card-image"
                        />
                      </div>

                      <div className="project-card-body">
                        <h4>{project.title}</h4>
                        <p className="project-meta">{project.meta}</p>
                        <p>{project.summary}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}

export default Projects;