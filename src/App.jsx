import { useEffect, useMemo, useState } from 'react';

import {
  experienceItems,
  techGroups,
  academicProjects,
  personalProjects,
  contactMethods,
  socials
} from './data/data';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const sectionIds = ['home', 'experience', 'tech', 'projects', 'contact'];

    const onScroll = () => {
      const y = window.scrollY + 180;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) current = id;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    ['home', 'Home'],
    ['experience', 'Experience'],
    ['tech', 'Tech'],
    ['projects', 'Projects'],
    ['contact', 'Contact']
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${mobile ? 'mobile-link' : 'topbar-link'} ${activeSection === id ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </a>
      ))}
    </>
  );

  return (
    <div className="site-shell">
      <header className="topbar-shell">
        <div className="topbar">
          <a href="#home" className="brand" aria-label="Neo Monserrat home">
            <div className="brand-avatar">
              <img src="/assets/Brand.png" alt="Neo" />
            </div>
            <div className="brand-text">
              <strong>Neo</strong>
              <span>Portfolio</span>
            </div>
          </a>

          <nav className="topbar-nav" aria-label="Primary navigation">
            <NavLinks />
          </nav>

          <div className="topbar-right">
            <a className="topbar-cta" href="#contact">
              Let&apos;s Talk
            </a>
            <button
              type="button"
              className="menu-button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile menu">
        <div className="mobile-head">
          <div className="brand-avatar">N</div>
          <button type="button" className="close-button" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="mobile-nav">
          <NavLinks mobile />
        </nav>
        <a className="mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Let&apos;s Talk
        </a>
      </aside>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-frame">
            <div className="hero-noise" aria-hidden="true" />
            <div className="hero-grid-overlay" aria-hidden="true" />
            <div className="hero-spotlight" aria-hidden="true" />
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            <div className="hero-grid wide-shell">
              <div className="hero-copy hero-copy-left">
                <div className="hero-chip-row">
                  <span className="hero-chip">Portfolio</span>
                </div>

                <h1 className="hero-title hero-title-main">
                  Hello World<span className="hero-accent">!</span>
                </h1>

                <h2 className="hero-title hero-title-sub">I&apos;m Neo</h2>

                <p className="hero-role">
                  BS Computer Science Student passionate about software development and building thoughtful,
                  impactful projects.
                </p>

                <div className="hero-actions hero-actions-acid">
                  <a href="/assets/AntonioMonserrat_CV.pdf" download className="btn btn-accent btn-lg">
                    <span>↓</span>
                    Download Resume
                  </a>

                  <a href="#projects" className="btn btn-ghost-accent btn-lg">
                    View Projects
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-visual-ring hero-visual-ring-1" aria-hidden="true" />
                <div className="hero-visual-ring hero-visual-ring-2" aria-hidden="true" />

                <div className="hero-portrait-card">
                  <img src="/assets/profile-illustration.png" alt="Neo portrait" className="hero-portrait-image" />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="wide-shell">
            <div className="experience-heading">
              <span className="eyebrow">Journey</span>
              <h2>My career & experience</h2>
            </div>

            <div className="experience-timeline">
              {experienceItems.map((item, index) => (
                <article className="timeline-item" key={item.title}>
                  <div className="timeline-rail" aria-hidden="true">
                    <span className="timeline-dot" />
                    {index !== experienceItems.length - 1 && (
                      <span className="timeline-line" />
                    )}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-main">
                      <h3>{item.title}</h3>
                      <p className="timeline-company">{item.company}</p>
                      <p className="timeline-location">{item.location}</p>
                      <p className="timeline-text">{item.text}</p>
                    </div>

                    <div className="timeline-year">
                      <span>{item.year}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tech" className="section">
          <div className="wide-shell">
            <div className="section-header section-header-split">
              <div>
                <span className="eyebrow">Tools</span>
                <h2>Tech stack</h2>
              </div>
            </div>

            <div className="tech-layout">
              {techGroups.map((group) => (
                <section className="tech-panel" key={group.title}>
                  <div className="tech-panel-head">
                    <h3>{group.title}</h3>
                  </div>

                  <div className="tech-clean-grid">
                    {group.items.map((item) => (
                      <article className="tech-clean-card" key={item.name}>
                        <div className="tech-clean-icon-wrap">
                          <img src={item.icon} alt={item.name} className="tech-clean-icon" />
                        </div>
                        <span className="tech-clean-name">{item.name}</span>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

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

        <section id="contact" className="section">
          <div className="wide-shell">
            <div className="contact-layout">
              <div className="contact-copy">
                <div className="section-header left-tight">
                  <span className="eyebrow">Contact</span>
                  <h2>Leave Me A Message</h2>
                  <p>
                    Open to internship opportunities, collaborations, or just chatting about games, sports, music, and
                    tech.
                  </p>
                </div>

                <div className="chip-row">
                  <span className="chip">✅ Open for internships</span>
                  <span className="chip">⏱ Usually replies in 24–48h</span>
                </div>

                <div className="action-row action-row-contact">
                  <a href="mailto:neo.monserrat@gmail.com" className="btn btn-primary">
                    Email Me
                  </a>
                  <a href="/assets/AntonioMonserrat_CV.pdf" download className="btn btn-secondary">
                    Download CV
                  </a>
                </div>

                <p className="contact-note">
                  Prefer email for anything formal. For quick questions, message me through any social media platform.
                </p>
              </div>

              <article className="card contact-card">
                <div className="contact-avatar">NM</div>
                <h3>Neo Monserrat</h3>
                <p className="contact-role">College Student</p>
                <p className="contact-location">📍 Manila &amp; Cavite · PH</p>

                <div className="contact-method-list">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      className="contact-method"
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      <span className="contact-method-label">{method.label}</span>
                      <strong>{method.value}</strong>
                    </a>
                  ))}
                </div>

                <div className="social-grid">
                  {socials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                      {social.name}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wide-shell footer-inner">
          <div>
            <div className="footer-name">Neo Monserrat</div>
            <div className="footer-meta">BS Computer Science - Major in Software Technology</div>
          </div>

          <div className="footer-links">
            <a href="tel:+639276646821">Phone</a>
            <a href="mailto:neo.monserrat@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/antonio-enrique-monserrat" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/NeoMonserrat" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div className="footer-copy">© {year}</div>
        </div>
      </footer>
    </div>
  );
}
